import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductCardDetails from "../productCardDetails/ProductCardDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
} from "../../../redux/actions/wishlistAction";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cartAction";
import Ratings from "../../products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  console.log(data);

  useEffect(() => {
    if (!data) return;

    const exists =
      wishlist &&
      wishlist.find(
        (i) => (i._id && data._id && i._id === data._id) || (i.id && data.id && i.id === data.id)
      );

    setClick(Boolean(exists));
  }, [wishlist, data]);

  const toggleWishlistHandler = (data) => {
    const id = data?._id || data?.id;
    const exists = wishlist && wishlist.find((i) => (i._id || i.id) === id);
    if (exists) {
      dispatch(removeFromWishlistAsync(id));
      setClick(false);
    } else {
      dispatch(addToWishlistAsync(data));
      setClick(true);
    }
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id || i.id === id);
    if (isItemExists) {
      // increase quantity by 1
      const updatedQty = (isItemExists.qty || 1) + 1;
      const cartData = { ...isItemExists, qty: updatedQty };
      dispatch(addToCart(cartData));
      toast.success("Item quantity updated in cart!");
    } else {
      if (data?.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1, _id: data?._id || data?.id };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data?._id || data?.id}?isEvent=true`
              : `/product/${data?._id || data?.id}`
          }`}
        >
          <img
            src={data?.imageUrl[0]?.url}
            alt={data.name}
            className="w-full h-[170px] object-contain "
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.shop.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data?._id || data?.id}?isEvent=true`
              : `/product/${data?._id || data?.id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data?.name.length > 40
              ? data?.name.slice(0, 40) + "..."
              : data?.name}
          </h4>
          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data?.originalPrice === 0
                  ? data?.originalPrice
                  : data?.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data?.originalPrice ? data?.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.soldOut} sold
            </span>
          </div>
        </Link>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => toggleWishlistHandler(data)}
              color={"red"}
              title="Remove from Wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => toggleWishlistHandler(data)}
              color={"#333"}
              title="Add to Wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(true)}
            color="#333"
            title="Quick View"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data?._id || data?.id)}
            color="#444"
            title="Add to cart"
          />
          {open && <ProductCardDetails setOpen={setOpen} data={data} />}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
