"use client";

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Select,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import { TFormikIinitialValues } from "../../../../types";
import { RxCross1 } from "react-icons/rx";

const AddProductsRenderForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState([]);

  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      description: "",
      brand: "",
      images: [],
      instrumentType: "",
      amount: "",
    },
    validationSchema: yup.object({
      productName: yup
        .string()
        .max(100, "Must be 200 caracters or less")
        .required(),

      price: yup.string().required(),
      description: yup
        .string()
        .max(1500, "Must be 5000 caracters or less")
        .required(),
      brand: yup.string().max(15, "Must be 30 caracters or less").required(),
      images: yup.array(),
      instrumentType: yup.string().required(),
      amount: yup
        .number()
        .required("Please set a number")
        .typeError("Please set a number"),
    }),

    onSubmit: async (
      values: TFormikIinitialValues,
      { resetForm }: { resetForm: () => void }
    ) => {
      setIsLoading(true);

      //  Uploading Images to cloudinary ↓↓

      try {
        if (files) {
          if (!files.length) {
            formik.setFieldValue("images", []);
            throw new Error("Error uploading image");
          }

          if (files.length > 0) {
            const formData = new FormData();
            const images: string[] = formik.values.images;
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

                formik.setFieldValue("images", data.secure_url);
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
          console.log(error.message);
        }
      }

      // Sending images to data base ↓↓

      try {
        const promise = await Promise.all(formik.values.images);
        if (promise) {
          const res = await fetch(
            "http://localhost:3000/api/admin/add-products",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: formik.values.productName,
                price: formik.values.price,
                description: formik.values.description,
                brand: formik.values.brand,
                images: formik.values.images,
                instrumentType: formik.values.instrumentType,
                amount: formik.values.amount,
              }),
            }
          );
          if (res.ok) {
            setIsLoading(false);
            toast({
              description: "Product has been updated!",
              duration: 3000,
              isClosable: true,
              status: "success",
              position: "top",
            });
            resetForm();
          } else {
            setIsLoading(false);
          }
        } else {
          throw new Error("Error to fetch database");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Drop Zone Image ↓↓

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((preFiles): any => [
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

  // Remove Drop Zone Images ↓↓

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file: any) => file.name !== name));
  };

  return (
    <>
      <Flex
        minH="100vh"
        mt={10}
        justifyContent="center"
        alignItems="center"
        mb={10}
      >
        <form onSubmit={formik.handleSubmit} style={{ width: "1000px" }}>
          <Flex flexDir="column" gap={4} minW="100%">
            <Flex flexDir="column">
              <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
                Product name
              </FormLabel>

              <Input
                fontSize={["12px", "14px", "16px"]}
                size={["xs", "sm", "md"]}
                variant="flushed"
                placeholder="Product Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productName}
                type="text"
                name="productName"
              />
              {formik.touched.productName && formik.errors.productName && (
                <Text>{formik.errors.productName}</Text>
              )}
            </Flex>
            <Flex flexDir="column">
              <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
                Price
              </FormLabel>
              <Input
                fontSize={["12px", "14px", "16px"]}
                size={["xs", "sm", "md"]}
                variant="flushed"
                placeholder="Price"
                onBlur={formik.handleBlur}
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
                  formik.setFieldValue("price", formattedValue);
                }}
                value={
                  formik.values.price === undefined ? "" : formik.values.price
                }
                type="text"
                name="price"
              />
              {formik.touched.price && formik.errors.price && (
                <Text>{formik.errors.price}</Text>
              )}
            </Flex>
            <Flex flexDir="column">
              <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
                Description of products
              </FormLabel>

              <Textarea
                fontSize={["12px", "14px", "16px"]}
                size={["xs", "sm", "md"]}
                variant="flushed"
                placeholder="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                name="description"
              />
              {formik.touched.description && formik.errors.description && (
                <Text>{formik.errors.description}</Text>
              )}
            </Flex>
            <Flex flexDir="column">
              <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
                Brands
              </FormLabel>

              <Input
                fontSize={["12px", "14px", "16px"]}
                size={["xs", "sm", "md"]}
                variant="flushed"
                placeholder="Brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                type="text"
                name="brand"
              />
              {formik.touched.brand && formik.errors.brand && (
                <Text>{formik.errors.brand}</Text>
              )}
            </Flex>
            <section about="Drop_Box">
              <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
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
                    Drag and drop some files here, or click to select files
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
                <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
                  Type of instrument
                </FormLabel>

                <Select
                  fontSize={["12px", "14px", "16px"]}
                  size={["xs", "sm", "md"]}
                  variant="flushed"
                  placeholder="Select option"
                  value={formik.values.instrumentType}
                  onChange={(e) =>
                    formik.setFieldValue("instrumentType", e.target.value)
                  }
                  onBlur={() => formik.handleBlur}
                >
                  <option value="Electric-Guitars">Electric Guitars</option>
                  <option value="Electric-Bass">Electric Bass</option>
                  <option value="Electric-Drums">Electric Drums</option>
                  <option value="Acoustic-Drums">Acoustic Drums</option>
                </Select>
                {formik.touched.instrumentType &&
                  formik.errors.instrumentType && (
                    <p>{formik.errors.instrumentType}</p>
                  )}
              </Box>
            </section>
            <Flex flexDir="column">
              <FormLabel fontSize={["12px", "14px", "16px"]} color="gray.400">
                Amount of products
              </FormLabel>

              <Input
                fontSize={["12px", "14px", "16px"]}
                size={["xs", "sm", "md"]}
                variant="flushed"
                placeholder="Amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                type="text"
                name="amount"
              />
              {formik.touched.amount && formik.errors.amount && (
                <Text>{formik.errors.amount}</Text>
              )}
            </Flex>
            <Flex justifyContent="center">
              {!isLoading ? (
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
    </>
  );
};

export default AddProductsRenderForm;
