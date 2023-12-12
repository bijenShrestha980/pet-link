import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// FEATURES
import { useDeletePageMutation } from "../../features/api/pageApi";
// UTILS
import {
  MoreVerticalIcon,
  PencilIcon,
  TashIcon,
  ViewIcon,
} from "../../utils/icons";
import Ellipse from "../../layout/Loader/Ellipsis";

const LinkCard = ({ cardItems }) => {
  const [
    deletePage,
    {
      data: deletePageData,
      error: deletePageError,
      isError: deleteIsError,
      isLoading: deletePageIsLoading,
      isSuccess: deletePageIsSuccess,
    },
  ] = useDeletePageMutation();

  // Delete Pages
  const handleDelete = (id) => {
    deletePage(id);
  };

  useEffect(() => {
    if (deleteIsError) {
      // console.log(deletePageError);
      toast.error(deletePageError.data.message);
    }
    if (deletePageIsSuccess) {
      // console.log(deletePageData);
      toast.success(deletePageData.message);
    }
  }, [deleteIsError, deletePageIsSuccess]);

  return (
    <div className="w-full h-full ">
      <div className="cardWrapper h-full">
        <div className="cardHeader py-[16px] px-[12px]  bg-brand_primary flex justify-between items-center">
          <div className="headerContents text-[#EEEEEE]">
            <h4 className="font-[700] text-[14px] leading-[18.2px] capitalize mb-[4px]">
              {cardItems?.type === "file"
                ? `${cardItems.name}`
                : cardItems?.type === "books"
                  ? `My ${cardItems.name}`
                  : cardItems?.type === "image"
                    ? `${cardItems?.name}`
                    : cardItems?.type === "video"
                      ? `My ${cardItems?.name}`
                      : cardItems?.type === "profile"
                        ? `My ${cardItems?.name}`
                        : cardItems?.type === "bio-link"
                          ? `${cardItems?.name}`
                          : cardItems.type === "menus"
                            ? `${cardItems?.name}`
                            : null}
            </h4>
            <h5 className="font-[700] text-[12px] leading-[13.2px] capitalize">
              {cardItems.type}
            </h5>
          </div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="h-[27px] w-[27px] bg-white rounded-full flex justify-center items-center text-center cursor-pointer"
            >
              <MoreVerticalIcon className="h-[17px] text-brand_primary" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content top-[35px] -right-[8px] menu shadow bg-base-100 rounded-[8px] w-[60px] overflow-hidden p-0"
            >
              <li className="hover:bg-brand_primaryFade py-2 custom-transition">
                <Link
                  to={`/dashboard/my_page/${cardItems.type}/${cardItems.id}`}
                  className="p-0 mx-auto w-full hover:bg-transparent flex justify-center items-center"
                >
                  <ViewIcon />
                </Link>
              </li>
              <li className="hover:bg-brand_primaryFade py-2 custom-transition">
                <Link
                  to={`/dashboard/my_page/${cardItems.type}/${cardItems.id}`}
                  className="p-0 mx-auto w-full hover:bg-transparent flex justify-center items-center"
                >
                  <PencilIcon />
                </Link>
              </li>
              <li className="hover:bg-brand_primaryFade py-2 custom-transition">
                <div
                  className="p-0 mx-auto w-full hover:bg-transparent flex justify-center items-center"
                  onClick={() => handleDelete({ id: cardItems.id })}
                >
                  <TashIcon />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`cardBody h-[237px] bg-white ${
            cardItems?.type === "books"
              ? "overflow-y-scroll scrollBarWidth scrollBarThumb"
              : cardItems?.type === "bio-link"
                ? "overflow-y-scroll scrollBarWidth scrollBarThumb"
                : cardItems?.type === "menus"
                  ? "overflow-y-scroll scrollBarWidth scrollBarThumb"
                  : null
          }`}
        >
          <div className="cardContents h-full">
            {cardItems?.type === "file" ? (
              <Website file={cardItems} isLoading={deletePageIsLoading} />
            ) : cardItems?.type === "image" ? (
              <ImageCard image={cardItems} isLoading={deletePageIsLoading} />
            ) : cardItems?.type === "books" ? (
              <BookCard book={cardItems} isLoading={deletePageIsLoading} />
            ) : cardItems?.type === "bio-link" ? (
              <BioCard bio={cardItems} isLoading={deletePageIsLoading} />
            ) : cardItems?.type === "menus" ? (
              <Menus menu={cardItems} isLoading={deletePageIsLoading} />
            ) : cardItems?.type === "profile" ? (
              <Profile profile={cardItems} isLoading={deletePageIsLoading} />
            ) : cardItems?.type === "video" ? (
              <Video video={cardItems} isLoading={deletePageIsLoading} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const source = ` ${import.meta.env.VITE_BASE_URL}`;

const Website = ({ file, isLoading }) => {
  const fileImage = file?.map?.content?.image;

  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="webSiteDetailsWrapper">
      <div className="websiteDetails pt-[21px] text-center">
        <div className="fileImageWrapper shadowCard">
          <img
            src={`${source}/images/${fileImage}`}
            alt=""
            className="w-[100px] m-auto object-cover object-center rounded-[8px]"
          />
        </div>
        <h4 className="font-[700] text-[14px] leading-[28px] tracking-wide break-words  text-center py-4">
          {file?.map?.content?.name}
        </h4>
      </div>
    </div>
  );
};

const ImageCard = ({ image, isLoading }) => {
  const imageLink = image?.map?.content?.link;
  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="image_card h-full">
      <div className="image_Wrapper h-full py-4 shadowCard">
        <img
          src={` ${source}/images${imageLink}`}
          alt=""
          className="object-cover h-full w-[182px] max-w-full m-auto rounded-[8px]"
        />
      </div>
    </div>
  );
};

const BookCard = ({ book, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="bookCard">
      {book?.map?.content?.books?.map((booksData, i) => (
        <div className="bookCardWrapper py-3" key={i}>
          <div className="bookImagerWrapper  m-auto shadowCard">
            <img
              src={`${source}/images/${booksData?.files?.image}`}
              alt=""
              className="w-[100px] object-cover object-center m-auto rounded-[8px]"
            />
          </div>
          <div className="booksContent text-center mt-3">
            <h1 className="font-[700] text-[14px] leading-[28px]">
              {booksData.name}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

const BioCard = ({ bio, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="BioCard flex justify-center items-center pt-[21px]">
      <div className="mainCardWrapper flex flex-col">
        {bio?.map?.content?.biolink
          .filter((el) => el.name !== "addToContact")
          ?.map((bioData) => {
            return (
              <div
                className="bioCardWrapper flex w-[133px] max-w-full border-[1px] border-[#949494] rounded-[8px] my-[4px]"
                key={bioData?.id}
              >
                <div className="iconContainer h-[19px] w-[19px]  mr-[6px] my-[5px] ml-[5px]">
                  <img src={`${source}/images/${bioData?.icon}`} alt="" />
                </div>
                <h2 className="iconDetails font-[400] text-[10px] leading-[13px] py-[10px] pb-[8px] capitalize">
                  {bioData?.name}
                </h2>
              </div>
            );
          })}
      </div>
      {/* <div className="bioCardWrapper flex w-[133px] max-w-full">
        <div className="iconContainer h-[19px] w-[19px] bg-[#9b0f37]  mr-[6px]"></div>
        <div className="iconDetails">Facebook</div>
      </div> */}
    </div>
  );
};

const Menus = ({ menu, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="menuContainer">
      <div className="mainCategoryWrapper">
        {menu?.map?.content?.categories?.map((mainCategory, i) => (
          <div className="mainCategoryDesc py-2 px-2" key={i}>
            <h2
              className="text-center font-[700] text-[16px] leading-[13px]"
              key={mainCategory.id}
            >
              {mainCategory?.name}
              <div className="subCategoryWrapper">
                {mainCategory?.menus.map((subCategory, j) => (
                  <div className="subCategoryDesc" key={j}>
                    {/* <h2 className="text-start font-[600] text-[14px] leading-[13px]">
                      {subCategory?.name}
                    </h2> */}

                    <div className="itemsWrapper px-4 my-2">
                      {subCategory?.menu_item.map((items, k) => (
                        <div
                          className="itemsDesc w-full flex justify-between my-2 rounded-[4px] p-2 bg-brand_primary text-white"
                          key={k}
                        >
                          <h2 className="text-start font-[500] text-[12px] leading-[13px] capitalize">
                            {items?.name}
                          </h2>
                          <h2 className="text-start font-[500] text-[12px] leading-[13px] capitalize">
                            Rs: {items.price} ↓
                          </h2>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = ({ profile, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="ProfileWrapper h-full grid place-content-center">
      <div className="contentsWrapper text-center">
        <h2 className="title font-[700] text-[24px] leading-[36.6px] capitalize my-[8px]">
          {profile?.name}
        </h2>
        <h3 className="text-[700] text-[18px] leading-[22px]  my-[8px]">
          {profile?.map?.content?.designation}
        </h3>
        <h3 className="text-[400] text-[14px] leading-[21px]  my-[8px]">
          {profile?.map?.content?.company_address}
        </h3>
        <h4></h4>
      </div>
    </div>
  );
};

const Video = ({ video, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-brand_primaryFade opacity-50 w-full h-full rounded-[8px] flex justify-center">
        <Ellipse />
      </div>
    );
  }
  return (
    <div className="videoWrapper h-full grid place-content-center">
      <div className="videoContents text-center px-2 overflow-hidden">
        <h2 className="">{video?.map?.content?.name}</h2>
        <h5 className="font-[400] text-[14px] break-words">
          {video?.map?.content?.link}
        </h5>
      </div>
    </div>
  );
};

export default LinkCard;
