import Link from "next/link";
import Image from "next/image";

type ButtonProps = {
  text: string;
  link?: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className: string;
  disabled?: boolean;
  style?: any;
  id?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export default function Button({
  text,
  link,
  type,
  onClick,
  className,
  disabled,
  style,
  id,
  image,
  imageWidth,
  imageHeight,
}: ButtonProps) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      id={id}
    >
      <Link href={link ?? ""}>
        {image && (
          <Image
            src={image}
            alt=""
            width={imageWidth ?? 40}
            height={imageHeight}
          />
        )}
        {text}
      </Link>
    </button>
  );
}
