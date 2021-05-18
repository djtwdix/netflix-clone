import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { selectUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  storeSubscription,
  selectSubscription,
} from "../features/subscriptionSlice";

function PlansScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const subscriptionRedux = useSelector(selectSubscription);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          dispatch(
            storeSubscription({
              role: subscription.data().role,
              current_period_end:
                subscription.data().current_period_end.seconds,
              current_period_start:
                subscription.data().current_period_start.seconds,
            })
          );
        });
      });
  }, [user.uid, dispatch]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51HAf6ALYq6U8xexmHzxDDXHA51OXTdQd76JG1ayxIwsoFimFu9RbwshlvBjw0wPiu53Tp0FBa2OVlLUG2Tf87RUH006MXXLmZv"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <p className="plansScreen__renewal">
        Renewal date:{" "}
        {new Date(
          subscriptionRedux?.current_period_end * 1000
        ).toLocaleDateString()}
      </p>
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name.includes(
          subscriptionRedux?.role
        );
        return (
          <div key={productId} className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
              className={
                !isCurrentPackage
                  ? "plansScreen__subscribe"
                  : "plansScreen__subscribe disabled"
              }
            >
              {isCurrentPackage ? "Current" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
