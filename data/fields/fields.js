const { COUNTRIES } = require("../countries");

export const EMPLOYEFIELD = [
  {
    name: "firstName",
    labelText: "First Name",
    type: "text",
    placeholder: "Enter First Name",
    validationOptions: {
      required: "First name is required",
    },
  },
  {
    name: "lastName",
    labelText: "Last Name",
    type: "text",
    placeholder: "Enter Last Name",
    validationOptions: {
      required: "Last name is required",
    },
  },
  {
    name: "email",
    labelText: "Email Address",
    type: "email",
    helperText: "*Please enter a valid email address.",
    placeholder: "Enter your email",
    validationOptions: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format. Please check and try again.",
      },
    },
  },
  {
    name: "phone",
    labelText: "Phone Number",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter Phone Number",
    validationOptions: {
      required: "Phone No. is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number. Must be exactly 10 digits.",
      },
    },
  },
  {
    name: "address",
    labelText: "Address",
    type: "text",
    placeholder: "Apt, Syuite, Building",
    validationOptions: {
      required: "Address is required",
    },
  },
  {
    name: "streetAddress",
    labelText: "Street Address(optional)",
    type: "text",
    placeholder: "Street Address(optional)",
  },
  {
    name: "city",
    labelText: "City",
    type: "text",
    placeholder: "city",
    validationOptions: {
      required: "city is required",
    },
  },
  {
    name: "zipCode",
    labelText: "Zipcode",
    type: "text",
    placeholder: "Zip/Postal Code",
    validationOptions: {
      required: "zipcode is required",
    },
  },
  {
    name: "country",
    labelText: "Country",
    options: COUNTRIES,
    type: "select",
    validationOptions: { required: "Country is required" },
  },
  {
    name: "paymentType",
    labelText: "Employe Type",
    options: [
      { label: "Monthly", value: "Monthly" },
      { label: "Weekly", value: "Weekly" },
    ],
    defaultValue: "Monthly",
    type: "radio",
    validationOptions: { required: "employe Type is required" },
  },
  {
    name: "accountName",
    labelText: "Account Name",
    type: "text",
    placeholder: "Enter Account Name",
    size: true,
    validationOptions: {
      required: "Account name is required",
    },
  },
  {
    name: "accountNumber",
    labelText: "Account Number",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter Account Number",
    validationOptions: {
      required: "Account number is required",
      pattern: {
        value: /^\d{8}$/i,
        message: "Must be exactly  8 digits",
      },
    },
  },
  {
    name: "sortCode",
    labelText: "Sort Code",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter Sort Code",
    validationOptions: {
      required: "Sort code is required",
      pattern: {
        value: /^\d{6}$/i,
        message: "Must be exactly 6 digits",
      },
    },
  },
  {
    name: "utr",
    labelText: " UTR",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter UTR number",
    validationOptions: {
      required: " UTR  number is required",
      pattern: {
        value: /^\d{10}$/i,
        message: "Must be exactly 10 digits",
      },
    },
  },
  {
    name: "payRate",
    labelText: "Pay Rate",
    type: "text",
    inputMode: "numeric",
    placeholder: "Enter Pay Rate",
    validationOptions: {
      required: "Pay rate is required",
      pattern: {
        // first 3 digit decimal two  places is optional
        value: /^\d{1,2}(\.\d{1,2})?$/,
        message: "Must be a number with optional decimal places",
        //   value: /^\d{1,2}\.\d{2}$/i,
        //   value: /^\d+(\.\d{1,2})?$/i,
      },
    },
  },
  {
    name: "employeNI",
    labelText: "Employee NI",
    type: "text",
    placeholder: " Enter Employee NI",
    validationOptions: {
      required: " Employee NI is required",
      pattern: {
        // capital  letters and numbers only nine  digits
        value: /^[A-Z]{2}\d{6}[A-Z]$/i,
        message: "Must be in the format XX123456X",
        //   value: /^\d{9}[A-Z]{3}$/i,
        //   value: /^[0-9]{6}[0-9A-Z]{4}[0-9A-Z]$/i,
      },
    },
  },
  {
    name: "employeRole",
    labelText: "Employee Role",
    type: "text",
    placeholder: "Enter Employee Role",
    validationOptions: {
      required: "Employee Role is required",
      minLength: {
        value: 3,
        message: "Minimum length should be 3 characters",
      },
      pattern: {
        value: /^(?! )[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*(?<! )$/,
        message: "Invalid employe role format",
        // only space not  allowed
        // value: /^[A-Za-z0-9\s]+$/,
        //   value: /^[A-Za-z\s]{3,50}$/i,
        //   value: /^[a-zA-Z\s]{3,50}$/i,
        //   value: /^[a-zA-Z\s]+$/,
        //   message: "Must be a string of letters and spaces",
      },
    },
  },
  {
    name: "immigrationStatus",
    labelText: " Immigration Status",
    type: "text",
    placeholder: "Enter Immigration Status",
    validationOptions: {
      required: "Immigration Status is required",
      minLength: {
        value: 3,
        message: "Minimum length should be 3 characters",
      },
      pattern: {
        value: /^(?! )[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*(?<! )$/,
        message: "Invalid immigration status format",
      },
    },
  },
  {
    name: "projectSite",
    labelText: "Project Site",
    options: [],
    type: "select",
    placeholder: "Select Project Site",
    validationOptions: { required: " Project Site is required" },
  },
  //   {
  //     name: "oldData",
  //     type: "checkbox",
  //     labelText: "Old Data",
  //     placeholder: "If you want Update all old attendance",
  //   },
  {
    name: "startDate",
    labelText: "Start Date",
    type: "date",
    placeholder: "Start Date",
    validationOptions: {
      required: "Start Date is required",
    },
  },
  {
    name: "eVisaExp",
    labelText: " Visa  Expiry Date",
    type: "date",
    placeholder: "Visa End Date",
    validationOptions: {
      required: " Visa Expiry Date is required",
    },
  },
];

export const SITEFIELD = [
  {
    name: "siteName",
    labelText: "Site Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    placeholder: "Enter your Site Name",
    validationOptions: {
      required: "This Site Name is required",
    },
  },
  {
    name: "siteAddress",
    labelText: "Site Address",
    type: "text",
    placeholder: "Enter Site address",
    validationOptions: {
      required: "Site Address is required",
    },
  },
  {
    name: "status",
    labelText: "Site Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "On Hold", label: "On Hold" },
      { value: "Completed", label: "Completed" },
      { value: "No Status", label: "No Status" },
    ],
    validationOptions: { required: "Site Status is required" },
  },
  {
    name: "siteType",
    labelText: "Site Type",
    type: "select",
    options: [
      { value: "Residential", label: "Residential" },
      { value: "Commercial", label: "Commercial" },
      { value: "Industrial", label: "Industrial" },
      { value: "Other", label: "Other" },
    ],
    validationOptions: { required: "Site Type is required" },
  },
  {
    name: "startDate",
    labelText: "Start Date",
    type: "date",
    placeholder: "Start Date",
    validationOptions: {
      required: "Start Date is required",
    },
  },
  {
    name: "endDate",
    labelText: "End Date",
    type: "date",
    placeholder: "site end date",
    validationOptions: {
      required: "End Date is required",
    },
  },
  {
    name: "siteDescription",
    labelText: "Site Description",
    size: true,
    type: "textarea",
    helperText: "*Describe the Site Project",
    placeholder: "On this site we will be doing like loft conversion...",
  },
];

export const OFFICEFIELD = [
  {
    name: "name",
    labelText: "Role Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    size: true,
    placeholder: "Enter Role Name",
    validationOptions: {
      required: "Role Name is required",
    },
  },
  {
    name: "phoneNumber",
    labelText: "Role Phone Number",
    type: "number",
    inputMode: "numeric",
    placeholder: "Enter Role Phone Number",
    validationOptions: {
      required: "Phone No. is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number. Must be exactly 10 digits.",
      },
    },
  },
  {
    name: "email",
    labelText: "Email Address",
    type: "email",
    helperText: "*Please enter a valid email address.",
    placeholder: "Enter your email",
    inputMode: "email",

    validationOptions: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format. Please check and try again.",
      },
    },
  },
  {
    name: "department",
    labelText: "Role Department",
    type: "text",
    placeholder: "operation, office,business...",
    validationOptions: {
      required: "Role Department is required",
    },
  },
  {
    name: "roleType",
    labelText: "Role Type",
    options: [
      { label: "test", value: "1" },
      { label: "test2", value: "2" },
    ],
    type: "select",
    validationOptions: { required: "Role Type is required" },
  },
  // {
  //   name: "paymentType",
  //   labelText: "Payment Type",
  //   options: [
  //     { label: "Monthly", value: "Monthly" },
  //     { label: "CIS", value: "Weekly" },
  //   ],
  //   defaultValue: "Monthly",
  //   type: "radio",
  //   validationOptions: { required: "Payment Type is required" },
  // },
  {
    name: "password",
    labelText: "Password",
    type: "password",
    placeholder: "******",
    helperText:
      "*if  you want to change password, please enter New password, OtherWise leave as it is",
    size: true,
    validationOptions: {
      required: "password is required",
      minLength: {
        value: 6,
        message: "Minimum length should be 6 characters",
      },
    },
  },
  {
    name: "startDate",
    labelText: "Start Date",
    type: "date",
    placeholder: "Start Date",
    validationOptions: {
      required: "Start Date is required",
    },
  },
  {
    name: "endDate",
    labelText: "End Date",
    type: "date",
    placeholder: "Visa End Date",
    validationOptions: {
      required: "End Date is required",
    },
  },
];

export const ASSIGNSITEMANAGERFIELD = [
  {
    name: "roleId",
    labelText: "Employe Name",
    options: [],
    type: "select",
    selectLable: "Search Name",
    validationOptions: { required: "Employee Name is required" },
  },
  {
    name: "projectSiteID",
    labelText: "Site Name",
    options: [],
    type: "select",
    selectLable: "Search site",
    validationOptions: { required: "Site Name is required" },
  },
  {
    name: "startDate",
    labelText: "Start Date",
    type: "date",
    placeholder: "Start Date",
    validationOptions: {
      required: "Start Date is required",
    },
  },
  {
    name: "endDate",
    labelText: "End Date",
    type: "date",
    placeholder: "End Date",
    validationOptions: {
      required: "End Date is required",
    },
  },
];

export const ROLETYPEFIELD = [
  {
    name: "roleTitle",
    labelText: "Role Name",
    type: "text",
    helperText: "*This Name will appear be on Site Project.",
    placeholder: "Enter Role Type",
    size: true,
    validationOptions: {
      required: "Role Type is required",
    },
  },
  {
    name: "roleDescription",
    labelText: "Role Description",
    size: true,
    type: "textarea",
    helperText: "*Describe Our Role Types",
    placeholder: "On this site we will be doing like loft conversion...",
  },
];
