"use client";
import { GlobalForm } from "@/components/form/form";
import { CalendarHeader } from "./components/calender-header";
import {
  completeUploadAwsMultipartDocument,
  getPresignedURLAWS,
  listParts,
  uploadAWSMultipartDocument,
  uploadToAws,
} from "@/server/aws/upload";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FormImageUpload } from "@/components/form/image-upload";
import { Button } from "@/components/ui/button";
import EmployeeDashboard from "@/components/employee-dashboard";

export default function CalendarPage() {
  const multipartUploads = useRef({}); // Stores multipart upload details for each file
  const [uploadProgress, setUploadProgress] = useState({});
  const fields = [
    // {
    //   name: "profileImage",
    //   labelText: "Profile Image",
    //   type: "imageProfile",
    //   placeholder: "Upload Profile Image",
    //   acceptedFileTypes: { "image/*": [".png", ".jpg", ".jpeg"] },
    //   maxFileSize: 1024 * 1024 * 5,
    //   maxFiles: 1,
    //   size: true,
    //   validationOptions: {
    //     required: "Image is required",
    //   },
    // },
    {
      name: "docImage",
      labelText: "Document",
      type: "image",
      placeholder: "Upload Profile Image",
      acceptedFileTypes: {
        "image/*": [".png", ".jpg", ".jpeg"],
        "application/pdf": [".pdf"],
        "video/*": [".mp4"],
      },
      maxFileSize: 1024 * 1024 * 10,
      maxFiles: 1,
      size: true,
      validationOptions: {
        required: "Image is required",
      },
    },
  ];
  const handleSubmit = async (data) => {
    const file = data.docImage;
    const { uploadId } = await uploadAWSMultipartDocument(file);
    multipartUploads.current[file.name] = {
      uploadId,
      parts: [],
      file,
    };
    uploadFileParts(file, uploadId);
  };
  const uploadFileParts = async (file, uploadId) => {
    const partSize = 5 * 1024 * 1024; // 6MB
    const totalParts = Math.ceil(file.size / partSize);

    if (!multipartUploads.current[file.name]) {
      multipartUploads.current[file.name] = { parts: [] };
    }
    const parts = multipartUploads.current[file.name].parts;

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      // Skip uploaded parts
      if (parts[partNumber - 1]?.ETag) continue;

      const start = (partNumber - 1) * partSize;
      const end = Math.min(start + partSize, file.size);
      const blob = file.slice(start, end);

      try {
        const { url } = await getPresignedURLAWS(
          uploadId,
          partNumber,
          file.name
        );
        const response = await axios.put(url, blob, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              ((start + progressEvent.loaded) / file.size) * 100
            );
            setUploadProgress((prev) => ({ ...prev, [file.name]: percent }));
          },
        });

        // ✅ Extract ETag safely (remove quotes if present)
        const eTag = response.headers.etag?.replace(/"/g, "");

        // ✅ Ensure the parts array is correctly populated
        // parts[partNumber - 1] = {
        //   ETag: eTag,
        //   PartNumber: partNumber,
        // };

        multipartUploads.current[file.name].parts.push({
          ETag: eTag,
          PartNumber: partNumber,
        });
        const result = await listParts(uploadId, file.name);
        if (partNumber === totalParts) {
          completeMultipartUpload(file);
        }
      } catch (error) {
        console.error(
          `Failed to upload part ${partNumber} of ${file.name}`,
          error
        );
        toast.error(`Failed to upload part ${partNumber} of ${file.name}`);
        break;
      }
    }
  };
  const completeMultipartUpload = async (file) => {
    try {
      const { uploadId, parts } = multipartUploads.current[file.name];
      const response = await completeUploadAwsMultipartDocument(
        uploadId,
        parts,
        file.name
      );
      console.log(response);
      setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      // setUploadProgress((prev) => ({ ...prev, [file.name]: null }));
      toast.success(` File uploaded successfully ${file.name}`);
    } catch (error) {
      toast.error(`Failed to  upload file ${file.name}`);
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen p-4">
        <div className="flex-1 flex flex-col">
          {/* <CalendarHeader /> */}
          <main className="flex-1 overflow-auto p-4">
            {/* <CalendarView /> */}
            <GlobalForm fields={fields} onSubmit={handleSubmit} />
            {uploadProgress && Object.keys(uploadProgress).length > 0 && (
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-2">
                  {Object.keys(uploadProgress).map((file) => (
                    <div key={file} className="flex items-center space-x-2">
                      <div>
                        <h3 className="text-sm font-bold">{file}</h3>
                      </div>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <p className="text-sm text-gray-600">
                        {uploadProgress[file]}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
        {/* <CreateScheduleDialog  /> */}
      </div>
      <EmployeeDashboard />
    </>
  );
}
