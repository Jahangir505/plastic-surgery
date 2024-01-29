import React, { useEffect, useState } from 'react'
import HomeLayout from "@/HOC/public-layouts/PublicLayout";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Checkout from '@/pages/subscribe/checkout';
import { products } from '@/assets/data/products';
import Link from "next/link"



  const Subscribe = () => {
    const { data: session, status } = useSession();
    const route = useRouter();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const product_list = products;
    const handleProductSelect = (product) => {
      setSelectedProduct(product);
    };
  
    const handleCheckoutSubmit = () => {
      // Handle the submission of checkout form
      // You can send the order to the server or integrate with a payment gateway
    };
  
    if (status === 'loading') {
      return (
        <HomeLayout>
          <div className='bg-gray-500 px-6 py-6 h-96 flex flex-col items-center justify-center'>
            <h1>Loading.....</h1>
          </div>
        </HomeLayout>
      );
    }
  
    if (!session) {
      route.push('/auth/login');
    }
  
    
  
    return (
      <HomeLayout>
        <div className='bg-gray-500 px-6 py-6 flex flex-col items-center justify-center'>
          <div className="mt-6 grid grid-cols-3 gap-x-8 max-auto gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {product_list.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg">
                <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                  <img src={product.imageSrc} alt={product.imageAlt} className="object-cover object-center" />
                  <div className="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                    <Link href={`/subscribe/checkout?id=${product.id}`} className="w-full rounded-md bg-gray-900 bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur backdrop-filter">
                      Subscribe
                    </Link>
                  </div>
                </div>
                <div className="mt-4 p-3 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                  <h3>
                    <Link href={`/subscribe/checkout?id=${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    );
  };
  
  export default Subscribe;