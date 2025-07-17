import BannerCarousel from "../components/bannerCarousel";
import OfferBanner from "../components/dealOftheDay";
import ProductCategorySection from "../components/Products.jsx/Category";
import Products from "../components/Products.jsx/product";
import Testimonials from "../components/testemonial";



export default function Home() {
    return (<><div className="w-full ">
  <BannerCarousel/>
  <ProductCategorySection/>
  <OfferBanner/>
        <Products/>
        
        <Testimonials/>
  
        
    </div>
  
    </>
      
    );
  }
  