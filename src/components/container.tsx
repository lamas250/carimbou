import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface ContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  button?: React.ReactNode;
  image?: string | React.ReactNode;
  leftButton?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  title,
  description,
  children,
  button,
  image,
  leftButton,
}) => {
  return (
    <div className={`h-auto ${title && "pt-16"} flex-1`}>
      <div className="container px-4 py-8 sm:py-12 mx-auto w-full">
        <div className="flex flex-col md:flex-row lg:flex-row items-start md:items-center justify-between">
          <div className="mb-1 flex flex-row gap-2 items-center">
            {image &&
              (typeof image === "string" && image.startsWith("https://") ? (
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                  <Image
                    src={image}
                    alt={title || "Logo da empresa"}
                    width={60}
                    height={60}
                    className="rounded-sm w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded bg-primary/5 flex items-center justify-center">
                  {image}
                </div>
              ))}
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">{title}</h1>
              {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>
            {leftButton && (
              <div className="mt-4 md:mt-2 ml-4 mb-4 md:ml-0 md:mr-auto flex-1 text-right">
                {leftButton}
              </div>
            )}
          </div>
          {button && <div className="mt-4 md:mt-0 mb-4 w-full md:w-auto text-right">{button}</div>}
        </div>
        {title && (
          <div className="mt-4 mb-4">
            <Separator />
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Container;
