// eslint-disable-next-line
import React from "react";
import { Avatar, List } from "antd"
import logo from "../assets/noImg.png";

// eslint-disable-next-line react/prop-types
const TokenItems = ({ tokens }) => {
    return (
        <>
            {tokens ? (
                <List
                    bordered
                    itemLayout="horizontal"
                    dataSource={tokens}
                    renderItem={(item) => (
                        <List.Item style={{ textAlign: "left" }}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.logo || logo} />}
                                title={item.symbol}
                                description={item.name}
                            />
                            <div>
                                {(
                                    Number(item.balance) /
                                    10 ** Number(item.decimals)
                                ).toFixed(2)}{" "}
                                Tokens
                            </div>
                        </List.Item>
                    )}
                />
            ) : (
                <>
                    <span className="font-semibold">You seem to not have any tokens yet</span>
                    {/* <p className="frontPageBottom">
                Find Alt Coin Gems:{" "}
                <a
                  href="https://moralismoney.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  money.moralis.io
                </a>
              </p> */}
                </>
            )}
        </>
    )
}

export default TokenItems