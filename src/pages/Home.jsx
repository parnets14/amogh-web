import BannerCarousel from "../components/bannerCarousel";
import HealthTips from "../components/Blog";
import DealsOfTheDay from "../components/dealOftheDay";
import ProductCategorySection from "../components/Products.jsx/Category";
import Products from "../components/Products.jsx/product";
import Testimonials from "../components/testemonial";
import TrustedBrands from "../components/trustedBrand";


export default function Home() {
    return (<><div className="w-full ">
  <BannerCarousel/>
  <ProductCategorySection/>
        <Products/>
        <DealsOfTheDay/>
        <TrustedBrands/>
        <Testimonials/>
        <HealthTips/>
        
    </div>
  
    </>
      
    );
  }
  