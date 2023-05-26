function GoodsItem(props) {
    const {
        id,
        name,
        description,
        price,
        full_background,
        addToBasket = Function.prototype } = props;

    return (
        <div className="card gooditem" id={id}>
            <div className="card-image">
                <img src={full_background} alt={name} />
                {/* <span className="card-title">{name}</span> */}
            </div>
            <div className="card-content">
                <p>{description}</p>
            </div>
            <div className="card-action">
                <button
                    className="btn"
                    onClick={() =>
                        addToBasket({
                            id,
                            name,
                            price
                        })
                    }
                >Купить</button>
                <span className="right">{price}</span>
            </div>
        </div>
    );
}

export { GoodsItem };