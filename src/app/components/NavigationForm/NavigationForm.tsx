"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../Input/Input";
import Button from "../Button/Button";

const searchSchema = z.object({
  origin: z.string().min(1, "مبدا الزامی است"),
  destination: z.string().min(1, "مقصد الزامی است"),
});

type SearchSchema = z.infer<typeof searchSchema>;

type Props = {
  onSearch: (data: SearchSchema) => void;
};

const NavigationForm = ({ onSearch }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async(data: SearchSchema) => {
   await onSearch(data);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      <div className="">
        <Input
          label="مبدا (مختصات یا نام مکان)"
          {...register("origin")}
          placeholder="مثال: 35.68 یا تهران"
          error={errors.origin?.message}
        />
        <Input
          label="مقصد (مختصات یا نام مکان)"
          {...register("destination")}
          placeholder="مثال: 35.71 یا شمال تهران"
          error={errors.destination?.message}
        />
      </div>
      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full"
        variant="primary-dark"
      >
        محاسبه مسیر
      </Button>
    </form>
  );
};

export default NavigationForm;
