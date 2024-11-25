// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line react/prop-types

const NFTItems = ({ nfts }) => {
  return (
    <>
      {nfts ? (
        <>
          {/* eslint-disable-next-line react/prop-types */}
          {nfts.map((e, i) => {
            return (
              <>
                {e && (
                  <img key={i} className="nftImage" alt="nftImage" src={e} />
                )}
              </>
            );
          })}
        </>
      ) : (
        <>
          <span className="font-semibold">You seem to not have any NFTs yet</span>
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
  );
};

export default NFTItems;
