import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AvatarHeaderContainer, AvatarName } from "./style";

import { DropDown } from "../DropDown/DropDown";

import { AppContext } from "../../context/AppContext";

import { ReactComponent as IconAvatar } from "../../assets/avatar.svg";
import { ReactComponent as IconArrow } from "../../assets/arrowDown.svg";

type Props = {
  name: string;
  dropDown: boolean;
};

interface Item {
  title: string;
  action: () => void;
}

export const AvatarHeader = ({ name, dropDown }: Props) => {
  let navigate = useNavigate();
  const { logOut } = useContext(AppContext);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([
      { title: "Profile", action: () => navigate("/profile") },
      {
        title: "Log out",
        action: () => {
          logOut();
          navigate("/login");
        },
      },
    ]);
  }, []);

  return (
    <AvatarHeaderContainer>
      <IconAvatar className={"avatar"} />
      <AvatarName>{name}</AvatarName>
      <IconArrow />
      {dropDown && <DropDown items={items} />}
    </AvatarHeaderContainer>
  );
};
