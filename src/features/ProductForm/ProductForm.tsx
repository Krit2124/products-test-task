import { IProduct } from "@/shared/types/products";
import styles from "./index.module.scss";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface ProductFormProps {
  product: IProduct | null;
  handleSubmit: (product: IProduct) => void;
}

const ProductForm: FC<ProductFormProps> = ({ product, handleSubmit }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [albumId, setAlbumId] = useState(product?.albumId || 0);
  const [link, setLink] = useState(product?.url || "");
  const [linkThumbnail, setLinkThumbnail] = useState(product?.thumbnailUrl || "");

  const handleSubmitWithoutDefaultAction = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!title || !link || !linkThumbnail) {
      toast.error("All fields must be filled in")
      return;
    }

    if (albumId <= 0) {
      toast.error("Album id must be greater than 0")
      return;
    }

    const newProduct = {
      title,
      albumId,
      url: link,
      thumbnailUrl: linkThumbnail
    }
    
    handleSubmit(newProduct);
  };

  return (
    <form action="" className={styles.form}>
      <label>
        <p>Product title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        <p>Album id</p>
        <input
          type="number"
          value={albumId}
          onChange={(e) => setAlbumId(Number(e.target.value))}
        />
      </label>

      <label>
        <p>Link to the product image</p>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </label>

      <label>
        <p>Link to the product thumbnail image</p>
        <input
          type="text"
          value={linkThumbnail}
          onChange={(e) => setLinkThumbnail(e.target.value)}
        />
      </label>

      <button
        type="submit"
        onClick={(event) => handleSubmitWithoutDefaultAction(event)}
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
