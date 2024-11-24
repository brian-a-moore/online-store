type Props = {
    product?: any;
};

export const ProductForm: React.FC<Props> = ({ product }) => {
    console.log('ProductForm', product);
    return(
        <form>
            <h1>Product Form</h1>
        </form>
    )
};