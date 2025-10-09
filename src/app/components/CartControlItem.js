import { Button, Input } from "reactstrap";
import Image from "next/image";

export default function CartControlItem(props) {    
    const {id, amount, removeFromCartHandler, increaseAmountHandler, decreaseAmountHandler} = props;
        return (<div className="input-group w-100">
            <Button
            className="btn-outline-light" color=""
            onClick={() => removeFromCartHandler(id)}
            >
            <Image
                src="/trash.svg"
                alt="+"
                width={20}
                height={20}
            />
            </Button>
            <Button
            className="btn btn-outline-light" color=""
            id={`decreaseButton${id}`}
            onClick={() => decreaseAmountHandler(id)}
            >
            <Image
                id={`dImg${id}`}
                src={"/minus.svg"}
                alt="-"
                width={20}
                height={20}
            />
            </Button>
    
            {/* Count display */}
            <Input
            type="text"
            className="form-control text-center"
            id={`cartCount${id}`}
            value={amount}
            readOnly
            />
    
            {/* Increase button */}
            <Button
            className="btn-outline-light" color=""
            onClick={() => increaseAmountHandler(id)}
            >
            <Image
                src="/plus.svg"
                alt="+"
                width={20}
                height={20}
            />
            </Button>
        </div>)
}