"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ProductsResponse } from "../../../types";
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
  Heading,
  Grid,
  GridItem,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import AdminDeleteSingleProduct from "./AdminDeleteSingleProduct";
import { TbEdit } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";

type TEditProduct = {
  name: string;
  price: string;
  description: string;
  brand: string;
  images: string[];
  instrumentType: string;
  amount: number;
  _id: string;
  stripe_price_id: string;
  stripe_product_id: string;
};

const AdminRenderDashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<any>([]);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<ProductsResponse>([]);
  const [singleProduct, setSingleProduct] = useState<TEditProduct>({
    name: "",
    description: "",
    amount: 0,
    brand: "",
    images: [],
    instrumentType: "",
    price: "",
    _id: "",
    stripe_price_id: "",
    stripe_product_id: "",
  });

  async function fetchItemById(id: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/user/cart/get-products/by-id?q=${id}`
    );

    const data = await response.json();
    return data;
  }

  const toast = useToast();

  useEffect(() => {
    try {
      setIsLoadingProducts(true);
      (async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/products/get-all`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setIsLoadingProducts(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }

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
    e.preventDefault();
    const { name, value }: any = e.target;

    setSingleProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoadingSend(true);

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_ADDRESS}/api/admin/edit-products`,
          {
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
              stripe_price_id: singleProduct.stripe_price_id,
              stripe_product_id: singleProduct.stripe_product_id,
            }),
          }
        );

        if (res.ok) {
          setIsLoadingSend(false);
          onClose();
          toast({
            description: "Product has been updated!",
            duration: 3000,
            isClosable: true,
            status: "success",
            position: "top",
          });
        } else {
          setIsLoadingSend(false);
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
    <Flex gap={2} minH="calc(100vh - 16rem)" mt={10} justify="center">
      <Grid
        templateColumns={{
          base: "repeat(auto-fill, minmax(50%, 1fr))",
          sm: "repeat(auto-fill, minmax(100%, 1fr))",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={3}
      >
        {products.map((data) => (
          <GridItem key={data._id}>
            <Card
              p={2}
              h="150px"
              overflow="hidden"
              variant="unstyled"
              size="sm"
              direction="row"
              gap={2}
              align="center"
              _hover={{
                boxShadow: "md",
                cursor: "pointer",
              }}
            >
              <CardHeader>
                <Image
                  alt={data.name}
                  src={data.images[0]}
                  maxW={["60px", "80px", "100px"]}
                  maxH={["60px", "80px", "100px"]}
                  objectFit="cover"
                />
              </CardHeader>
              <CardBody>
                <Heading fontSize={["8px", "10px", "12px"]} fontWeight="bold">
                  {data.name}
                </Heading>
                <Text
                  fontWeight="normal"
                  mt={2}
                  fontSize={["8px", "10px", "12px"]}
                >
                  {data.brand}
                </Text>
              </CardBody>
              <CardFooter gap={2}>
                <Tooltip
                  placement="top"
                  label="Add to cart"
                  bg="white"
                  color="black"
                  gutter={0}
                  fontSize="xs"
                >
                  <Flex
                    align="center"
                    justify="center"
                    onClick={() => handleEditProduct(data._id)}
                    borderRadius={10}
                    color="gray.500"
                    _hover={{
                      color: "brand.cyan2",
                    }}
                  >
                    <Icon as={TbEdit} w={[3, 4, 5]} h={[3, 4, 5]} />
                  </Flex>
                </Tooltip>

                <AdminDeleteSingleProduct
                  _id={data._id}
                  stripe_product_id={data.stripe_product_id}
                />
              </CardFooter>
            </Card>
            <Flex flex={1} gap={2}></Flex>
          </GridItem>
        ))}
      </Grid>

      <section about="Edit_Products_Modal">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={"5xl"}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={["12px", "14px", "16px"]}>
              Edit Product
            </ModalHeader>
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
                      <FormLabel
                        fontSize={["12px", "14px", "16px"]}
                        color="gray.400"
                      >
                        Product name
                      </FormLabel>

                      <Input
                        fontSize={["12px", "14px", "16px"]}
                        size={["xs", "sm", "md"]}
                        variant="flushed"
                        type="text"
                        name="name"
                        value={singleProduct?.name}
                        onChange={handleInputChange}
                      />
                    </Flex>
                    <Flex flexDir="column">
                      <FormLabel
                        fontSize={["12px", "14px", "16px"]}
                        color="gray.400"
                      >
                        Price
                      </FormLabel>
                      <Input
                        fontSize={["12px", "14px", "16px"]}
                        size={["xs", "sm", "md"]}
                        variant="flushed"
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
                      <FormLabel
                        fontSize={["12px", "14px", "16px"]}
                        color="gray.400"
                      >
                        Description of products
                      </FormLabel>

                      <Textarea
                        fontSize={["12px", "14px", "16px"]}
                        size={["xs", "sm", "md"]}
                        variant="flushed"
                        placeholder="Description"
                        onChange={handleInputChange}
                        value={singleProduct?.description}
                        name="description"
                      />
                    </Flex>
                    <Flex flexDir="column">
                      <FormLabel
                        fontSize={["12px", "14px", "16px"]}
                        color="gray.400"
                      >
                        Brands
                      </FormLabel>

                      <Input
                        fontSize={["12px", "14px", "16px"]}
                        size={["xs", "sm", "md"]}
                        variant="flushed"
                        placeholder="Brand"
                        onChange={handleInputChange}
                        value={singleProduct?.brand}
                        type="text"
                        name="brand"
                      />
                    </Flex>
                    <section about="Drop_Box">
                      <FormLabel
                        fontSize={["12px", "14px", "16px"]}
                        color="gray.400"
                      >
                        Images
                      </FormLabel>
                      <Flex
                        flexDir="column"
                        justify="center"
                        position="relative"
                        minH="400px"
                        border="1px solid gray"
                        borderRadius="md"
                        zIndex={1}
                        _hover={{
                          cursor: "pointer",
                        }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <Text
                            position="relative"
                            textAlign="center"
                            fontSize={["12px", "14px", "16px"]}
                            color="gray.400"
                          >
                            Drop the files here...
                          </Text>
                        ) : (
                          <Text
                            position="relative"
                            textAlign="center"
                            fontSize={["12px", "14px", "16px"]}
                            color="gray.400"
                          >
                            Drag and drop some files here, or click to select
                            files
                          </Text>
                        )}

                        <List
                          display="flex"
                          gap={2}
                          justifyContent="center"
                          flexWrap="wrap"
                          position="relative"
                        >
                          {files.map((file: any) => (
                            <ListItem key={file.name}>
                              <Image
                                objectFit="cover"
                                src={file.preview}
                                alt="image"
                                width={["80px", "100px", "120px"]}
                                height={["80px", "100px", "120px"]}
                                onLoad={() => {
                                  URL.revokeObjectURL(file.preview);
                                }}
                              />
                              <Icon
                                as={RxCross1}
                                onClick={() => removeFile(file.name)}
                                _hover={{
                                  color: "red.200",
                                  cursor: "pointer",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Flex>
                    </section>
                    <section about="Select type of products">
                      <Box>
                        <FormLabel
                          fontSize={["12px", "14px", "16px"]}
                          color="gray.400"
                        >
                          Type of instrument
                        </FormLabel>

                        <Select
                          fontSize={["12px", "14px", "16px"]}
                          size={["xs", "sm", "md"]}
                          variant="flushed"
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
                      <FormLabel
                        fontSize={["12px", "14px", "16px"]}
                        color="gray.400"
                      >
                        Amount of products
                      </FormLabel>

                      <Input
                        fontSize={["12px", "14px", "16px"]}
                        size={["xs", "sm", "md"]}
                        variant="flushed"
                        placeholder="Amount"
                        onChange={handleInputChange}
                        value={singleProduct?.amount}
                        type="number"
                        name="amount"
                      />
                    </Flex>
                    <Flex justifyContent="center">
                      {!isLoadingSend ? (
                        <Button
                          variant="outline"
                          type="submit"
                          bg="brand.cyan2"
                          textColor="white"
                          _hover={{
                            bg: "brand.cyan",
                          }}
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

export default AdminRenderDashboardPage;
