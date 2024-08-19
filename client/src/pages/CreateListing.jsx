import React from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../Firebase/firebase";
import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {setLoading, hideLoading} from '../redux/features/loadingSlice'
const CreateListing = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [offer, setOffer] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  
  });

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
        dispatch(setLoading());
      const res = await axios.post(
        "http://localhost:3500/api/v1/lisiting/create",
        {
          imageUrls: formData.imageUrls,
          name,
          description,
          address,
          type,
          bedrooms,
          bathrooms,
          regularPrice,
          discountPrice,
          offer,
          parking,
          furnished,
          userId: user._id
        },
        { withCredentials: true }
      );
      dispatch(hideLoading());
      if(res.data.success){
        message.success("Listing created successfully");
      }
      
    } catch (err) {
        dispatch(hideLoading());
      console.log(err);
      message.error(err.response.data.message);
    }
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },

        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((err) => {
              console.log(err);
              message.error("There was a problem in uploading images");
            });
        }
      );
    });
  };

  const handleDelete = (sentIndex) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter(
        (_, image_index) => image_index !== sentIndex
      ),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-7">Create Heading</h1>
      <form action="" className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-xl"
            id="name"
            value={name}
            maxLength={62}
            minLength={10}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-xl"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-xl"
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input  checked={type === 'sale'} type="checkbox" className="w-5" id="sale" 
               onChange={(e) => {
                if (e.target.checked) {
                  setType("sale");
                } else {
                  setType("");
                }
              }}
               />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input  checked={type === 'rent'} type="checkbox" className="w-5" id="rent" 
               onChange={(e) => {
                if (e.target.checked) {
                  setType("rent");
                } else {
                  setType("");
                }
              }}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                value={parking}
                onChange={(e) => setParking(e.target.checked)}
                type="checkbox"
                className="w-5"
                id="parking"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                value={furnished}
                onChange={(e) => setFurnished(e.target.checked)}
                type="checkbox"
                className="w-5"
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input value={offer} onChange={(e) => setOffer(e.target.checked)} type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  gap-4 my-5 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                className="p-3 border  border-gray-300 rounded-xl"
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border  border-gray-300 rounded-xl"
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border  border-gray-300 rounded-xl"
                type="number"
                id="regularPrice"
                required
                value={regularPrice}
                onChange={(e) => setRegularPrice(Number(e.target.value))}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-xl"
                type="number"
                id="discountPrice"
                required
                value={discountPrice}
                onChange={(e) => setDiscountPrice(Number(e.target.value))}
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 ml-2 gap-4 ">
          <p className="font-bold">
            Images:
            <span className="font-normal text-gray-600">
              {" "}
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded-xl w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={() => handleImageSubmit()}
              className="p-3 bg-green-700 text-white border border-white-700 rounded-xl hover:shadow-lg disabled:opacity-80 uppercase "
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((item, index) => (
              <div
                key={item}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={item}
                  alt="listing-img"
                  className="w-20 h-20 object-contain rounded-xl border border-slate-950"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="p-3 text-xl text-red-700 rounded-lg hover:opacity-75 uppercase"
                >
                  Delete
                </button>
              </div>
            ))}
          <button onClick={handleCreateListing} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create List
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
