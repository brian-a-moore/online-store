type Props = {
    store?: {
    id: string;
    name: string;
    website: string | null;
    image: string | null;
    bannerImage: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
} | undefined;
};

export const StoreForm: React.FC<Props> = ({ store }) => {
    console.log('StoreForm', store);
    return(
        <form>
            <h1>Store Form</h1>
        </form>
    )
};