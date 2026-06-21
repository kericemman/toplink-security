import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const ProductCard = ({ product, onBuy }) => (
  <article className="group border-t-2 border-[#0B2F50] bg-white">
    <Link to={`/store/${product.slug}`} className="block h-72 overflow-hidden bg-[#F1F0EC]">
      {product.coverImage?.url ? <img src={product.coverImage.url} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" /> : <div className="flex h-full items-center justify-center text-[#0CA4B8]"><Download size={52} strokeWidth={1.4} /></div>}
    </Link>
    <div className="py-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0CA4B8]">{product.category || "Security Guide"}</p>
      <Link to={`/store/${product.slug}`}><h2 className="mt-4 line-clamp-2 text-2xl font-extrabold leading-tight text-[#0B2F50] transition hover:text-[#0CA4B8]">{product.title}</h2></Link>
      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{product.shortDescription}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
        <p className="text-xl font-extrabold text-[#0B2F50]">{formatCurrency(product.price, product.currency)}</p>
        <div className="flex items-center gap-4">
          <button onClick={() => onBuy(product)} className="text-xs font-extrabold uppercase tracking-[0.08em] text-[#0CA4B8]">Buy</button>
          <Link to={`/store/${product.slug}`} className="flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[#0B2F50]">Details <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  </article>
);

export default ProductCard;
