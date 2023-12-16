
import React, { useEffect} from "react";
import PriceCard from "./PriceCard";
import { useDispatch, useSelector } from "react-redux";
import { ftechPricing } from "../../features/UserReducer";
import { HashLoader } from "react-spinners";


const Pricing = () => {

  const dispatch = useDispatch();
  const{pricing,loading} = useSelector(state=>state.users_info)
  useEffect(()=>{
    if(pricing.length === 0){
      dispatch(ftechPricing())
    }
  },[dispatch,pricing])

  return (
    <article className="bg-light py-5 border-bottom">
      <div className="container px-5 my-5">
        <hgroup className="text-center mb-5">
          <h2 className="fw-bolder">Pay as you grow</h2>
          <p className="lead mb-0">With our no hassle pricing plans</p>
        </hgroup>
        <section className="row gx-5 justify-content-center">
          {
          loading ? (
            <HashLoader />
          ) : 
          (
            pricing.map((list, index) => {
              return <PriceCard key={index} details={list} />;
            })
          )}
        </section>
      </div>
    </article>
  );
};

export default Pricing;
