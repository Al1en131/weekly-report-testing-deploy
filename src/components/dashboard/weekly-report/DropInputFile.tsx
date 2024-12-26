import Dropzone, { useDropzone } from "react-dropzone";
import { LegacyRef, SetStateAction, useEffect, useRef, useState } from "react";
import GalleryAddIcon from "@/components/icons/GalleryAdd";
import { Trash2Icon } from "@/components/icons";
import Image from "next/image";

function DropInputFile({
  className,
  setValue,
  value,
}: {
  className?: string;
  setValue: React.Dispatch<SetStateAction<Blob | string>>;
  value: string | Blob;
}) {
  const [path, setPath] = useState<string>();
  const [src, setSrc] = useState(""); // initial src will be empty
  const obj: LegacyRef<HTMLImageElement | null> = useRef(null);
  useEffect(() => {
    if (value == "") {
      setPath(undefined);
    }
  }, [value]);
  return (
    <div className={`${className}`}>
      <label
        className="text-white font-medium block relative"
        htmlFor="uploadmedia"
      >
        Upload Media (Optional)
      </label>

      <div className="mt-2 relative">
        <Dropzone
          disabled={value ? true : false}
          maxFiles={1}
          maxSize={500000}
          onDrop={(e) => {
            setSrc(URL.createObjectURL(e[0]));

            setPath(e[0].name);
            setValue(e[0]);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive, fileRejections }) => (
            <div
              className={`cursor-pointer ${
                src && "after:bg-black/60 after:absolute after:inset-0"
              } relative overflow-hidden  border border-grey w-fit h-fit rounded-lg`}
              {...getRootProps()}
            >
              {src && (
                <Image
                  alt=""
                  src={src}
                  className="absolute inset-0 w-full object-cover h-full"
                />
              )}

              <input
                id="uploadmedia"
                className="relative"
                {...getInputProps()}
              />

              {value ? (
                <div
                  onClick={() => {
                    setValue("");
                    setPath("");
                    setSrc("");
                  }}
                  className={`z-50   relative p-10`}
                >
                  <Trash2Icon />
                </div>
              ) : (
                <div className={`z-10   relative p-10`}>
                  <GalleryAddIcon />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default DropInputFile;
