import { GoodsItem } from "./GoodsItem";

function GoodsList(props) {
    const { goods = [], addToBasket = Function.prototype } = props;

    if (!goods.length) {
        return <h3>Not found</h3>;
    }

    return (
        <div className="goods container-fluid">
            <div className="row">
                <div className="col goodscol">
                {
                    goods.filter((item, index) => index%3 === 0)
                    .map(item => (
                    <GoodsItem key={item.id} {...item} addToBasket={addToBasket}/>))
                }
                </div>
                <div className="col goodscol">
                {
                    goods.filter((item, index) => index%3 === 1)
                    .map(item => (
                    <GoodsItem key={item.id} {...item} addToBasket={addToBasket}/>))
                }
                </div>
                <div className="col goodscol">
                {
                    goods.filter((item, index) => index % 3 === 2)
                    .map(item => (
                    <GoodsItem key={item.id} {...item} addToBasket={addToBasket}/>))
                }
                </div>
            </div>
            {/* {goods.map((item) => (
                
            ))} */}
        </div>
    );
}

export { GoodsList };