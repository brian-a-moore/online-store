type Props = {
  product?: {
    id: string;
    name: string;
    updatedAt: Date;
    isPublished: boolean;
  };
};

export const ProductForm: React.FC<Props> = ({ product }) => {
  console.log('ProductForm', product);
  return (
    <form>
      <h1>Product Form</h1>
    </form>
  );
};
