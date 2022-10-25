import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";

type CartItemProps = {
  id: number;
  quantity: number;
};

type StoreItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item: StoreItem | undefined = storeItems.find((item) => item.id === id);

  if (!!item)
    return (
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                x{quantity}
              </span>
            )}
          </div>
        </div>
      </Stack>
    );

  return null;
};
