import { Link } from "react-router-dom";
import { Download, ShoppingCart } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

const ProductCard = ({ product, onBuy }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/store/${product.slug}`} className="block h-52 bg-[#EAF2FF]">
        {product.coverImage?.url ? (
          <img
            src={product.coverImage.url}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#0B3D91]">
            <Download size={48} />
          </div>
        )}
      </Link>

      <div className="p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#0B3D91]">
          {product.category || "Security Guide"}
        </p>

        <Link to={`/store/${product.slug}`}>
          <h3 className="line-clamp-2 text-xl font-black text-[#020617] hover:text-[#0B3D91]">
            {product.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
          {product.shortDescription}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-2xl font-black text-[#0B3D91]">
            {formatCurrency(product.price, product.currency)}
          </p>

          <Button type="button" onClick={() => onBuy(product)}>
            <ShoppingCart size={17} />
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;