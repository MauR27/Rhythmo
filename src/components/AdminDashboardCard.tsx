"use client";

import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ProductsResponse } from "../../types";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormLabel,
  Image,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useToast,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchItemById } from "./ItemById";
import { useDropzone } from "react-dropzone";

type TProductsTypeProps = {
  products: ProductsResponse;
};

type TEditProduct = {
  name: string;
  price: string;
  description: string;
  brand: string;
  images: string[];
  instrumentType: string;
  amount: number;
  _id: string;
  stripeProductId: string;
};

const AdminDashboardCard: FC<TProductsTypeProps> = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState<TEditProduct>({
    name: "",
    description: "",
    amount: 0,
    brand: "",
    images: [],
    instrumentType: "",
    price: "",
    _id: "",
    stripeProductId: "",
  });
  const toast = useToast();

  useEffect(() => {
    if (singleProduct && Array.isArray(singleProduct.images)) {
      setFiles(
        singleProduct.images.map((url, index) => ({
          name: `image-${index}`,
          preview: url,
        }))
      );
    }
  }, [singleProduct]);

  const handleEditProduct = async (id: string) => {
    try {
      const data = await fetchItemById(id);
      setSingleProduct(data);

      onOpen();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value }: any = e.target;

    setSingleProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (files) {
        if (!files.length) {
          setSingleProduct((prev) => {
            return { ...prev, images: [] };
          });
          throw new Error("Error uploading image");
        }

        if (files.length > 0) {
          const formData = new FormData();
          const images: any = singleProduct.images;
          const url: string = process.env.NEXT_PUBLIC_CLOUDINARY_URL || "";

          for (let i: number = 0; i < files.length; i++) {
            formData.append("file", files[i]);
            formData.append("upload_preset", "pvexdg6r");

            const response = await fetch(url, {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              const imageUrl: string = data.secure_url;
              images.push(imageUrl);

              setSingleProduct((prev) => {
                return { ...prev, images: data.secure_url };
              });
            } else {
              console.error(
                "Failed to load image:",
                response.status,
                response.statusText
              );
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }

    try {
      const promise = await Promise.all(singleProduct.images);

      if (promise) {
        const res = await fetch("/api/admin-edit-product", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: singleProduct.name,
            description: singleProduct.description,
            amount: singleProduct.amount,
            brand: singleProduct.brand,
            images: singleProduct.images,
            instrumentType: singleProduct.instrumentType,
            price: singleProduct.price,
            _id: singleProduct._id,
            stripeProductId: singleProduct.stripeProductId,
          }),
        });

        if (res.ok) {
          await fetch("/api/update-cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: singleProduct.name,
              description: singleProduct.description,
              amount: singleProduct.amount,
              brand: singleProduct.brand,
              images: singleProduct.images,
              instrumentType: singleProduct.instrumentType,
              price: singleProduct.price,
              _id: singleProduct._id,
              stripeProductId: singleProduct.stripeProductId,
            }),
          });
          setIsLoading(false);
          onClose();
          toast({
            description: "Product has been updated!",
            duration: 3000,
            isClosable: true,
            status: "success",
            position: "top",
          });
        } else {
          setIsLoading(false);
        }
      } else {
        throw new Error("Error to fetch database");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((preFiles: any) => [
        ...preFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const removeFile = (name: string) => {
    setFiles((files: any) => files.filter((file: any) => file.name !== name));

    setSingleProduct((prevSingleProduct) => {
      const updatedImages = prevSingleProduct.images.filter(
        (url, index) => index !== parseInt(name.split("-")[1])
      );
      return {
        ...prevSingleProduct,
        images: updatedImages,
      };
    });
  };

  return (
    <Flex flexDir="column" gap={2}>
      {products.map((data) => (
        <Card key={data._id}>
          <CardHeader>
            <Text>{data.name}</Text>
          </CardHeader>
          <CardBody>
            <Image src={data.images[0]} alt={data.name} w={40} h={40} />
            <Text>{data.price}$</Text>
          </CardBody>
          <CardFooter>
            <Button onClick={() => handleEditProduct(data._id)}>
              Edit Product
            </Button>

            <Button>Delete</Button>
          </CardFooter>
        </Card>
      ))}
      <section about="Edit_Products_Modal">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={"5xl"}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                minH="100%"
                minW="100%"
                justifyContent="center"
                alignItems="center"
              >
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Flex flexDir="column" gap={4} minW="100%">
                    <Flex flexDir="column">
                      <FormLabel>Product name</FormLabel>

                      <Input
                        type="text"
                        name="name"
                        value={singleProduct?.name}
                        onChange={handleInputChange}
                      />
                    </Flex>
                    <Flex flexDir="column">
                      <FormLabel>Price</FormLabel>
                      <Input
                        onChange={(e) => {
                          const numericValue = parseFloat(
                            e.target.value.replace(/,/g, "")
                          );
                          const formattedValue = isNaN(numericValue)
                            ? ""
                            : numericValue.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              });
                          setSingleProduct((prev: any) => {
                            return { ...prev, price: formattedValue };
                          });
                        }}
                        value={
                          singleProduct.price === undefined
                            ? ""
                            : singleProduct.price
                        }
                        type="text"
                        name="price"
                      />
                    </Flex>
                    <Flex flexDir="column">
                      <FormLabel>Description of products</FormLabel>

                      <Textarea
                        placeholder="Description"
                        onChange={handleInputChange}
                        value={singleProduct?.description}
                        name="description"
                      />
                    </Flex>
                    <Flex flexDir="column">
                      <FormLabel>Brands</FormLabel>

                      <Input
                        placeholder="Brand"
                        onChange={handleInputChange}
                        value={singleProduct?.brand}
                        type="text"
                        name="brand"
                      />
                    </Flex>
                    <section about="Drop_Box">
                      <Box p="16" border="1px solid gray" borderRadius="md">
                        <FormLabel>Images</FormLabel>

                        <Box {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <Text>Drop the files here ...</Text>
                          ) : (
                            <Text>
                              Drag and drop some files here, or click to select
                              files
                            </Text>
                          )}
                        </Box>
                        <List display="flex" gap={2}>
                          {files.map((file: any) => (
                            <ListItem key={file.name}>
                              <Image
                                src={file.preview}
                                alt="image"
                                width={100}
                                height={100}
                                onLoad={() => {
                                  URL.revokeObjectURL(file.preview);
                                }}
                              />
                              <Button
                                type="button"
                                onClick={() => removeFile(file.name)}
                              >
                                X
                              </Button>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </section>
                    <section about="Select type of products">
                      <Box>
                        <FormLabel>Type of instrument</FormLabel>

                        <Select
                          placeholder="Select option"
                          value={singleProduct?.instrumentType}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            setSingleProduct((prevProduct) => ({
                              ...prevProduct,
                              instrumentType: selectedValue,
                            }));
                          }}
                        >
                          <option value="Electric-Guitars">
                            Electric Guitars
                          </option>
                          <option value="Electric-Bass">Electric Bass</option>
                          <option value="Electric-Drums">Electric Drums</option>
                          <option value="Acoustic-Drums">Acoustic Drums</option>
                        </Select>
                      </Box>
                    </section>
                    <Flex flexDir="column">
                      <FormLabel>Amount of products</FormLabel>

                      <Input
                        placeholder="Amount"
                        onChange={handleInputChange}
                        value={singleProduct?.amount}
                        type="number"
                        name="amount"
                      />
                    </Flex>
                    <Flex justifyContent="center">
                      {!isLoading ? (
                        <Button
                          variant="ghost"
                          type="submit"
                          bg="blue.100"
                          textColor="black"
                          px="4"
                          py="2"
                        >
                          send
                        </Button>
                      ) : (
                        <Spinner />
                      )}
                    </Flex>
                  </Flex>
                </form>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </section>
    </Flex>
  );
};

export default AdminDashboardCard;
