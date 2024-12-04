import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Check, ChevronsUpDown, Minus, Plus } from "lucide-react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Textarea } from "../ui/textarea";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

export const FormInput = ({ field, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Input
        id={field.name}
        type={field.type}
        placeholder={field.placeholder}
        {...register(field.name, {
          ...field.validationOptions,
          valueAsNumber: field.type === "number",
        })}
        {...props}
      />
      {field.helperText && (
        <p className="text-sm text-muted-foreground">{field.helperText}</p>
      )}
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const FormSelect = ({ field }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Controller
        name={field.name}
        control={control}
        rules={field.validationOptions}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const FormRadio = ({ field }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Controller
        name={field.name}
        control={control}
        rules={field.validationOptions}
        render={({ field: { onChange, value } }) => (
          <div className="border mt-1 rounded-md p-2.5 shadow-sm">
            <RadioGroup
              onValueChange={onChange}
              value={value}
              className="flex space-x-4"
            >
              {field.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`${field.name}-${option.value}`}
                  />
                  <Label
                    className="text-neutral-700"
                    htmlFor={`${field.name}-${option.value}`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      />
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const FormCheckbox = ({ field }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            id={field.name}
            checked={value}
            onCheckedChange={onChange}
          />
        )}
      />
      <Label htmlFor={field.name}>{field.labelText}</Label>
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const FormDate = ({ field }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const startYear = getYear(new Date()) - 100;
  const endYear = getYear(new Date()) + 100;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, k) => startYear + k
  );

  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Controller
        name={field.name}
        control={control}
        rules={field.validationOptions}
        render={({ field: { onChange, value } }) => {
          const handleMonth = (month) => {
            const newDate = setMonth(value, months.indexOf(month));
            onChange(newDate);
          };
          const handleYear = (year) => {
            if (!value) {
              value = new Date();
            }
            const newDate = setYear(value, parseInt(year));
            onChange(newDate);
          };

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? (
                    format(value, "PPP")
                  ) : (
                    <span>{field.placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 space-y-2">
                <div className="flex gap-2 justify-center">
                  <Select
                    onValueChange={handleMonth}
                    value={
                      months[getMonth(value)] || months[getMonth(new Date())]
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem value={month} key={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={handleYear}
                    value={
                      getYear(value).toString() ??
                      getYear(new Date().toString())
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem value={year.toString()} key={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="single"
                  selected={value || field.value}
                  onSelect={onChange}
                  month={value}
                  onMonthChange={onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const SearchableSelect = ({ field }) => {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const options = field.options;

  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Controller
        name={field.name}
        control={control}
        rules={field.validationOptions}
        render={({ field: { onChange, value } }) => (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  // role="combobox"
                  aria-expanded={open}
                  className={`w-full justify-between ${
                    value ? "text-neutral-900" : "text-neutral-500"
                  }`}
                >
                  {value
                    ? options.find((framework) => framework.value === value)
                        ?.label
                    : " Select an option"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command
                  filter={(value, search) => {
                    const item = options.find((item) => item.value === value);
                    if (!item) return 0;
                    if (item.label.toLowerCase().includes(search.toLowerCase()))
                      return 1;

                    return 0;
                  }}
                >
                  <CommandInput placeholder={"Search..."} />
                  <CommandList>
                    <CommandEmpty>{"No Data found."}</CommandEmpty>
                    {/* <ScrollArea className="h-72"> */}
                    <CommandGroup>
                      {options &&
                        options?.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={() => {
                              onChange(
                                framework.value === value ? "" : framework.value
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                    {/* </ScrollArea> */}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </>
        )}
      />
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const FormTextarea = ({ field, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Textarea
        id={field.name}
        placeholder={field.placeholder}
        {...register(field.name, {
          ...field.validationOptions,
          valueAsNumber: field.type === "number",
        })}
        {...props}
      />
      {field.helperText && (
        <p className="text-sm text-muted-foreground">{field.helperText}</p>
      )}
      {errors[field.name] && (
        <p className="text-sm text-destructive">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  );
};

export const FormImageUpload = ({ field }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <FormLabel name={field.name} labelText={field.labelText} />
      <Controller
        name={field.name}
        control={control}
        rules={field.validationOptions}
        render={({ field: { onChange, value } }) => (
          <Dropzone
            onDrop={(acceptedFiles) => {
              onChange(field.maxFiles === 1 ? acceptedFiles[0] : acceptedFiles);
            }}
            accept={field.acceptedFileTypes}
            maxSize={field.maxFileSize}
            maxFiles={field.maxFiles}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              fileRejections,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-md p-4 text-center cursor-pointer",
                  isDragActive ? "border-primary" : "border-gray-300"
                )}
              >
                <input {...getInputProps()} />
                {value ? (
                  <ImagePreview value={value} maxFiles={field.maxFiles} />
                ) : (
                  <p>
                    {isDragActive
                      ? "Drop the file here"
                      : `Drag 'n' drop ${
                          field.maxFiles > 1 ? "files" : "a file"
                        } here, or click to select`}
                  </p>
                )}
                {fileRejections?.length > 0 && (
                  <div className="text-red-500 mt-2">
                    {fileRejections.map(({ file, errors }) => (
                      <div key={file.name}>
                        {errors.map((e) => (
                          <p key={e.code}>{e.message}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        )}
      />
      {errors[field?.name] && (
        <p className="text-sm text-destructive">
          {errors[field?.name]?.message}
        </p>
      )}
    </div>
  );
};

const ImagePreview = ({ value, maxFiles }) => {
  if (maxFiles === 1) {
    const file = value;
    return (
      <Avatar className="w-20 h-20 mx-auto">
        <AvatarImage src={URL.createObjectURL(file)} alt={file.name} />
        <AvatarFallback>{file.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    );
  } else {
    const files = value;
    return (
      <div className="grid grid-cols-3 gap-2">
        {files.map((file, index) => (
          <div key={index} className="relative w-20 h-20">
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    );
  }
};

const Dropzone = ({ children, accept, maxSize, maxFiles, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept,
      maxSize,
      maxFiles,
      onDrop,
    });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children({ getRootProps, getInputProps, isDragActive, fileRejections })}
    </div>
  );
};

export const FormMultiInput = ({ field }) => {
  const {
    control,
    formState: { errors },
    getValues,
    trigger,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  });

  React.useEffect(() => {
    if (fields.length === 0) {
      append(""); // Initialize with one empty field if none exist
    }
  }, [fields, append]);

  const validateUniqueEmail = (email, index) => {
    const emails = getValues(field?.name);
    const isUnique = emails.every((e, i) => i === index || e !== email);
    return (
      isUnique ||
      ` ${
        field?.name.charAt(0).toUpperCase() + field?.name.slice(1)
      } must be unique`
    );
  };

  return (
    <div className="space-y-4">
      {fields.map((item, index) => (
        <div key={item?.id} className="flex items-center space-x-2">
          <div className="flex-grow">
            <Controller
              name={`${field?.name}.${index}`}
              control={control}
              rules={{
                ...field?.validationOptions,
                validate: (value) => validateUniqueEmail(value, index),
              }}
              render={({ field: { onChange, value, name } }) => (
                <div className="space-y-1">
                  {/* <Label
                    className="text-sm font-medium text-neutral-500"
                    htmlFor={field?.name}
                  >
                    {field?.labelText}
                  </Label> */}
                  <FormLabel name={field.name} labelText={field.labelText} />
                  <Input
                    type={field.inputType}
                    placeholder={field?.placeholder}
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      trigger(field?.name);
                    }}
                    name={name}
                    id={field?.name}
                  />
                </div>
              )}
            />
            {errors[field?.name]?.[index] && (
              <p className="text-sm text-destructive mt-1">
                {errors[field?.name][index]?.message}
              </p>
            )}
          </div>
          {fields.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {field?.helperText && (
        <p className="text-sm text-muted-foreground">{field?.helperText}</p>
      )}
      {errors[field?.name] && (
        <p className="text-sm text-destructive">
          {errors[field?.name]?.message}
        </p>
      )}
      {fields.length < field?.max && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
        >
          <Plus className="h-4 w-4" />
          Add {field?.labelText}
        </Button>
      )}
      {errors[field?.name] &&
        typeof errors[field?.name].message === "string" && (
          <p className="text-sm text-destructive">
            {errors[field?.name].message}
          </p>
        )}
    </div>
  );
};

const FormLabel = ({ name, labelText }) => {
  return (
    <Label className="text-sm font-medium text-neutral-500" htmlFor={name}>
      {labelText}
    </Label>
  );
};

// export const FormImageUpload = ({ field }) => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div className="space-y-2">
//       <Label htmlFor={field.name}>{field.labelText}</Label>
//       <Controller
//         name={field.name}
//         control={control}
//         rules={field.validationOptions}
//         render={({ field: { onChange, value } }) => (
//           <Dropzone
//             onDrop={(acceptedFiles) => {
//               onChange(acceptedFiles[0]);
//             }}
//           >
//             {({ getRootProps, getInputProps, isDragActive }) => (
//               <div
//                 {...getRootProps()}
//                 className={cn(
//                   "border-2 border-dashed rounded-md p-4 text-center cursor-pointer",
//                   isDragActive ? "border-primary" : "border-gray-300"
//                 )}
//               >
//                 <input {...getInputProps()} />
//                 {value ? (
//                   <p>File selected: {value.name}</p>
//                 ) : (
//                   <p>
//                     {isDragActive
//                       ? "Drop the file here"
//                       : "Drag 'n' drop a file here, or click to select a file"}
//                   </p>
//                 )}
//               </div>
//             )}
//           </Dropzone>
//         )}
//       />
//       {errors[field.name] && (
//         <p className="text-sm text-destructive">
//           {errors[field.name]?.message}
//         </p>
//       )}
//     </div>
//   );
// };

// const Dropzone = ({ children }) => {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "image/*": [".jpeg", ".png", ".jpg", ".gif"],
//     },
//     maxFiles: 1,
//   });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {children({ getRootProps, getInputProps, isDragActive })}
//     </div>
//   );
// };
