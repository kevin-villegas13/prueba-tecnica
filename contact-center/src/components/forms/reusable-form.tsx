"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingSpinner } from "../loading-spinner";

/**
 * Tipo para definir los campos del formulario.
 */
export type FieldType = {
  name: string;
  label: string;
  type?: "text" | "email" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

/**
 * Props del componente ReusableForm.
 */
export type ReusableFormProps<T extends Record<string, any>> = {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => Promise<void>;
  fields: FieldType[];
  submitText: string;
  loading?: boolean;
  error?: string | null;
};

/**
 * Componente para renderizar un campo de formulario dinámico.
 */
const FormField = <T extends Record<string, any>>({
  field,
  values,
  setFieldValue,
}: {
  field: FieldType;
  values: T;
  setFieldValue: (field: string, value: any) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      {field.type === "select" ? (
        <Select
          onValueChange={(value) => setFieldValue(field.name, value)}
          value={values[field.name] || ""}
        >
          <SelectTrigger className="border border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 shadow-md">
            {field.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Field
          as={Input}
          id={field.name}
          name={field.name}
          type={field.type || "text"}
          placeholder={field.placeholder}
        />
      )}
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

/**
 * Componente reutilizable para formularios con validación y carga.
 */
export function ReusableForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitText,
  loading = false,
  error,
}: ReusableFormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        await onSubmit(values, helpers);
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) =>
        isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <Form className="space-y-4">
            {error && <div className="text-red-500">{error}</div>}

            {fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                values={values}
                setFieldValue={setFieldValue}
              />
            ))}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
              disabled={isSubmitting || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                submitText
              )}
            </Button>
          </Form>
        )
      }
    </Formik>
  );
}
