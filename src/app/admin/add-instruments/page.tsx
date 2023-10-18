"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  List,
  ListItem,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

interface IinitialValues {
  productName: string;
  price: number;
  description: string;
  brand: string;
  images: string[];
  instrumentType: string;
  amount: number;
}

const AddInstruments = () => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: 0,
      description: "",
      brand: "",
      images: [],
      instrumentType: "",
      amount: 0,
    },

    validationSchema: yup.object({
      productName: yup
        .string()
        .max(100, "Must be 100 caracters or less")
        .required(),
      price: yup.number().required(),
      description: yup
        .string()
        .max(1500, "Must be 1500 caracters or less")
        .required(),
      brand: yup.string().max(15, "Must be 30 caracters or less").required(),
      images: yup.array(),
      instrumentType: yup.string().required(),
      amount: yup.number().required(),
    }),
    onSubmit: async (values: IinitialValues) => {
      try {
        if (files) {
          if (!files.length) {
            formik.setFieldValue("images", []);
            throw new Error("Error uploading image");
          }

          if (files.length > 0) {
            const formData = new FormData();
            const images = formik.values.images;
            const url: string = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

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
        console.log(error);
      }
      try {
        const promise = await Promise.all(formik.values.images);
        if (promise) {
          const res = await fetch("/api/products", {
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
          });
          const data = await res.json();
          console.log(data);
        } else {
          throw new Error("Error to fetch database");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Drop Zone Image

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

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file: any) => file.name !== name));
  };

  return (
    <>
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDir="column" gap={4}>
            <Flex flexDir="column">
              <Input
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
              <Input
                placeholder="Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                type="number"
                name="price"
              />
              {formik.touched.price && formik.errors.price && (
                <Text>{formik.errors.price}</Text>
              )}
            </Flex>
            <Flex flexDir="column">
              <Textarea
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
              <Input
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
            <Box p="16" border="1px solid gray" borderRadius="md">
              <Box {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Text>Drop the files here ...</Text>
                ) : (
                  <Text>
                    Drag and drop some files here, or click to select files
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
                    <Button type="button" onClick={() => removeFile(file.name)}>
                      X
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Select
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
            <Flex flexDir="column">
              <Input
                placeholder="Amount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                type="number"
                name="amount"
              />
              {formik.touched.amount && formik.errors.amount && (
                <Text>{formik.errors.amount}</Text>
              )}
            </Flex>
            <Flex justifyContent="center">
              <Button
                variant="ghost"
                type="submit"
                bg="purple.900"
                textColor="black"
                px="4"
                py="2"
              >
                send
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default AddInstruments;
