import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/productAction";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product Created Successfully!");
      navigate("/dashboard");
      // window.location.reload();
    }
  }, [error, dispatch, success]);

  const handleImageChange = async (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // replace with Cloudinary preset
      formData.append("cloud_name", "your_cloud_name"); // replace with Cloudinary cloud name

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        uploadedImages.push({
          public_id: data.public_id,
          url: data.secure_url,
        });
      } catch (err) {
        console.error("Cloudinary Upload Error:", err);
      }
    }

    setImages(uploadedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // images.forEach((image) => {
    //   formData.append("images", image);
    // });
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("category", category);
    // formData.append("tags", tags);
    // formData.append("originalPrice", originalPrice);
    // formData.append("discountPrice", discountPrice);
    // formData.append("stock", stock);
    // formData.append("shopId", seller._id);
    // dispatch(createProduct(formData));

    if (!seller?._id) {
      toast.error("Seller not authenticated!");
      return;
    }

    const productData = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images, // base64 array
    };
    await axios.post(`${server}/product/create-product`, productData, {
      withCredentials: true,
    });
   
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2 ">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 ">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={8}
            cols={30}
            required
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2 ">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onClick={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a Category">Choose a Category</option>
            {categoriesData &&
              categoriesData?.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2 ">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter Product Tags"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 ">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter Product Price"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 ">
            Price (with Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter Product Price with Discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2 ">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="stock"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter Product Stock"
          />
        </div>
        <br />
        <div>
          <label className="pb-2 ">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2 "
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
            Create Product
          </div>
        </div>
        <br />
      </form>
    </div>
  );
};

export default CreateProduct;
