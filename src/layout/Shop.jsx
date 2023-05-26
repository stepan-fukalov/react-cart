import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "../components/preloader";
import { Cart } from "../components/cart";
import { GoodsList } from "../components/goodsList";
import { BasketList } from "../components/basketList";
import { Alert } from "../components/alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState("");

    const addToBasket = (item) => {
        const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity+1,
                    };
                } else {
                    return orderItem;
                }
            });
    
            setOrder(newOrder);
        }
        setAlertName(item.name);
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const closeAlert = () => {
        setAlertName("");
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if(el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder)
    }

    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if(el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        });
    }, []);

    return (
        <main className="container content">
            <h3>{isBasketShow}</h3>
            {isBasketShow && <BasketList
                                order={order}
                                handleBasketShow={handleBasketShow}
                                removeFromBasket={removeFromBasket}
                                incQuantity={incQuantity}
                                decQuantity={decQuantity}
                            />}
            <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
            {loading ? (
            <Preloader />
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
            )}
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
        </main>
    );
}

export { Shop };