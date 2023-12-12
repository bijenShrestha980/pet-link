import { Suspense, lazy, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const MDEditor = lazy(() => import("@uiw/react-md-editor"));

// FEATURES
import {
  useDeletePageMutation,
  useUpdateActivePageMutation,
} from "../../features/api/pageApi";
import { appSelector } from "../../features/slice/appSlice";
// UTILS
import {
  ArrowDownIcon,
  CheckIcon,
  MoreVerticalIcon,
  PencilIcon,
  TashIcon,
  ViewIcon,
} from "../../utils/icons";
// COMPONENTS
import Loader from "../../layout/Loader/Loader";
import Ellipsis from "../../layout/Loader/Ellipsis";

const LinkCard = ({ cardItems, pageIsFetching }) => {
  const url = useLocation();
  const pageLink = url.pathname.split("/").pop();
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
    <div className="h-full w-full">
      <div className="cardWrapper relative h-full">
        <div className="cardHeader flex items-center justify-between bg-brand_primary py-[16px] px-[12px]">
          <div className="headerContents text-[#EEEEEE]">
            <h4 className="mb-[4px] text-[14px] font-[700] capitalize leading-[18.2px]">
              {cardItems?.type === "bio-link" ? `${cardItems?.name}` : null}
            </h4>
            <h5 className="text-[12px] font-[700] capitalize leading-[13.2px]">
              {cardItems?.type === "bio-link"
                ? "Pet Link"
                : `${cardItems?.name}`}
            </h5>
          </div>
          <div className="dropdown">
            <label
              tabIndex={0}
              className="flex h-[27px] w-[28px] cursor-pointer items-center justify-center rounded-full bg-white text-center hover:scale-105 active:scale-95 custom-transition shadow-2xl"
            >
              <MoreVerticalIcon className="h-[17px] text-brand_primary" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu top-[35px] -right-[8px] w-[60px] overflow-hidden rounded-[8px] bg-base-100 p-0 shadow"
            >
              <li className="custom-transition py-2 hover:bg-brand_primaryFade">
                <Link
                  to={`/dashboard/my_link/pet-link/${cardItems.id}`}
                  className="mx-auto flex w-full items-center justify-center p-0 hover:bg-transparent"
                >
                  <ViewIcon />
                </Link>
              </li>
              <li className="custom-transition py-2 hover:bg-brand_primaryFade">
                <Link
                  to={`/dashboard/my_link/pet-link/${cardItems.id}`}
                  className="mx-auto flex w-full items-center justify-center p-0 hover:bg-transparent"
                >
                  <PencilIcon />
                </Link>
              </li>
              <li className="custom-transition py-2 hover:bg-brand_primaryFade">
                <div
                  className="mx-auto flex w-full items-center justify-center p-0 hover:bg-transparent"
                  onClick={() => handleDelete({ id: cardItems.id })}
                >
                  <TashIcon />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`cardBody h-[154px] md:h-[224px] bg-white shadow-2xl ${
            cardItems?.type === "books"
              ? "scrollBarWidth scrollBarThumb overflow-y-scroll"
              : cardItems?.type === "bio-link"
                ? "scrollBarWidth scrollBarThumb overflow-y-scroll"
                : cardItems?.type === "menus"
                  ? "scrollBarWidth scrollBarThumb overflow-y-scroll"
                  : null
          }`}
        >
          <div className="cardContents h-full">
            {cardItems?.type === "file" ? (
              <Website
                file={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "image" ? (
              <ImageCard
                image={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "books" ? (
              <BookCard
                book={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "bio-link" ? (
              <BioCard
                bio={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "menus" ? (
              <Menus
                menu={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "profile" ? (
              <Profile
                profile={cardItems}
                isLoading={deletePageIsLoading}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "video" ? (
              <Video
                video={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "links" ? (
              <LinkPreviewCard
                link={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : cardItems?.type === "iframe" ? (
              <Iframe
                iframe={cardItems}
                isLoading={deletePageIsLoading}
                preview={pageLink}
                pageIsFetching={pageIsFetching}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const source = ` ${import.meta.env.VITE_BASE_URL}`;

const Active = ({ cardType, pageIsFetching }) => {
  const { token } = useSelector(appSelector);
  const id = token.affix_userId;
  const [
    updatePage,
    {
      data: updatePageData,
      isLoading: updatePageIsLoading,
      isSuccess: updatePageIsSuccess,
      error: updatePageError,
    },
  ] = useUpdateActivePageMutation();

  useEffect(() => {
    if (updatePageIsSuccess) {
      toast.success(updatePageData.message);
    }
    if (updatePageError) {
      toast.error(updatePageError.data.message);
    }
  }, [updatePageIsSuccess, updatePageError]);

  return (
    <button
      className={`isActiveContainer ml-auto flex h-[28px] w-[80px] items-center justify-evenly rounded-tl-[8px] ${
        cardType.active === "yes" ? "bg-brand_success" : "bg-brand_primaryFade"
      }`}
      onClick={() => updatePage({ page_id: cardType.id, user_id: id })}
    >
      {updatePageIsLoading || pageIsFetching ? (
        <div className="flex h-full w-full justify-start rounded-[8px] pl-[15px] opacity-50">
          <Ellipsis />
        </div>
      ) : (
        <>
          <div className="imgContainer">
            <CheckIcon className="h-[18px] w-[20px] pb-[3px]" />
          </div>
          <h2 className="text-[12px] font-[400] leading-[16px]">
            {cardType?.active === "yes" ? "In Use" : "Use Now"}
          </h2>
        </>
      )}
    </button>
  );
};

const Website = ({ file, isLoading, preview, pageIsFetching }) => {
  const fileImage = file?.map?.content?.image;

  return (
    <div className="webSiteDetailsWrapper relative flex h-full flex-col justify-evenly">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="websiteDetails px-6 pt-[21px] text-center">
          <div className="fileImageWrapper shadowCard">
            <img
              src={`${source}/images/${fileImage}`}
              alt=""
              className="m-auto w-[100px] rounded-[8px] object-cover object-center"
            />
          </div>
          <h4 className="break-words py-4 text-center text-[14px] font-[700]  leading-[28px] tracking-wide">
            {file?.map?.content?.name}
          </h4>
        </div>
      )}
      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={file} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const ImageCard = ({ image, isLoading, preview, pageIsFetching }) => {
  const imageLink = image?.map?.content?.link;

  return (
    <div className="image_card relative h-full px-2">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="image_Wrapper shadowCard flex h-full w-full flex-col justify-between rounded-[8px] py-4 align-middle">
          <h2 className="text-center">{image?.name}</h2>

          <img
            src={` ${source}/images${imageLink}`}
            alt=""
            className="m-auto max-w-full rounded-[8px] object-contain"
          />
          {/* <CheckIcon /> */}
        </div>
      )}
      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={image} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const BookCard = ({ book, isLoading, preview, pageIsFetching }) => {
  return (
    <div className="bookCard  flex h-full flex-col justify-between">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <>
          <div className="bookTitle">
            <h2 className="pt-4 text-center">{book?.name}</h2>
          </div>
          {book?.map?.content?.books?.map((booksData, i) => {
            return (
              <div className="bookCardWrapper py-3" key={i}>
                <div className="bookImagerWrapper  shadowCard m-auto">
                  <img
                    src={`${source}/images/${booksData?.files?.image}`}
                    alt=""
                    className="custom-transition m-auto mb-[24px] h-[316px] w-[216px] select-none rounded-[8px] object-cover shadow-xl group-active:scale-95"
                  />
                </div>
                <div className="booksContent mt-3 text-center">
                  <h1 className="text-[14px] font-[700] leading-[28px]">
                    {booksData.name}
                  </h1>
                </div>
              </div>
            );
          })}
        </>
      )}

      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={book} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const BioCard = ({ bio, isLoading, preview, pageIsFetching }) => {
  return (
    <div className="BioCard flex items-start justify-center pt-[21px] h-full">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="mainCardWrapper flex flex-col">
          {bio?.map?.content?.biolink
            .filter((el) => el.name !== "addToContact")
            ?.map((bioData) => {
              return (
                <div
                  className="bioCardWrapper my-[4px] flex w-[153px] max-w-full rounded-[8px] border-[1px] border-[#949494]"
                  key={bioData?.id}
                >
                  <div className="iconContainer my-[5px] mr-[6px] ml-[5px] flex  h-[19px] w-[19px] items-center">
                    <img src={`${source}/images/${bioData?.icon}`} alt="" />
                  </div>
                  <h2 className="iconDetails py-[10px] pb-[8px] text-[10px] font-[400] capitalize leading-[13px]">
                    {bioData?.name}
                  </h2>
                </div>
              );
            })}
        </div>
      )}
      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={bio} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const Menus = ({ menu, isLoading, preview, pageIsFetching }) => {
  return (
    <div className="menuContainer flex h-full flex-col justify-between">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="mainCategoryWrapper pt-2">
          {menu?.map?.content?.categories?.map((mainCategory, i) => (
            <div className="mainCategoryDesc py-2 px-2" key={i}>
              <h2
                className="text-center text-[16px] font-[700] leading-[13px]"
                key={mainCategory.id}
              >
                {mainCategory?.name}
              </h2>
              <div className="subCategoryWrapper">
                {mainCategory?.menus.map((subCategory, j) => (
                  <div className="subCategoryDesc" key={j}>
                    <h2 className="py-2 text-center text-[14px] font-[600] leading-[13px]">
                      {subCategory?.name}
                    </h2>

                    <div className="itemsWrapper my-2 px-4">
                      {subCategory?.menu_item
                        .filter((el) => el.active === "yes")
                        .map((items, k) => (
                          <div
                            className="itemsDesc my-2 flex w-full justify-between rounded-[4px] bg-brand_primary p-2 text-white"
                            key={k}
                          >
                            <h2 className="text-start text-[12px] font-[500] leading-[13px]">
                              {items?.name}
                            </h2>
                            <h2 className="flex items-center text-start text-[12px] font-[500] leading-[13px]">
                              Rs: {items.price}
                              <ArrowDownIcon className="h-[15px] w-[15px]" />
                            </h2>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={menu} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const Profile = ({ profile, isLoading, pageIsFetching }) => {
  return (
    <div className="ProfileWrapper relative grid h-full place-content-center">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="contentsWrapper text-center">
          <h3 className="my-[8px] text-[18px] leading-[22px] text-[700]">
            {profile?.map?.content?.designation}
          </h3>
          <h3 className="my-[8px] text-[14px] leading-[21px] text-[400]">
            {profile?.map?.content?.company_address}
          </h3>
        </div>
      )}
      <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
        <Active cardType={profile} pageIsFetching={pageIsFetching} />
      </div>
    </div>
  );
};

const Video = ({ video, isLoading, preview, pageIsFetching }) => {
  return (
    <div className="videoWrapper relative flex h-full flex-col justify-between">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="videoContents overflow-hidden p-2 pt-8 text-center">
          <h2 className="">{video?.map?.content?.name}</h2>
          <h5 className="break-words text-[14px] font-[400]">
            {video?.map?.content?.link}
          </h5>
        </div>
      )}
      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={video} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const LinkPreviewCard = ({ link, isLoading, preview, pageIsFetching }) => {
  return (
    <div className="relative flex h-full flex-col justify-between">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="overflow-hidden p-2 pt-8 text-center">
          <h5 className="break-words text-[14px] font-[400]">
            {link?.map?.content?.url}
          </h5>
        </div>
      )}
      {preview === "my_page" ? (
        <div className="absolute bottom-0 right-0 z-10">
          <Active cardType={link} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

const Iframe = ({ iframe, isLoading, preview, pageIsFetching }) => {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden">
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <Suspense
          fallback={
            <SkeletonTheme baseColor="#f8ffd29e" highlightColor="#ffffff">
              <Skeleton className="h-[100dvh] w-full" />
            </SkeletonTheme>
          }
        >
          <MDEditor
            value={iframe?.map?.content?.body}
            height="100%"
            hideToolbar="true"
            preview="preview"
          />
        </Suspense>
      )}
      {preview === "my_page" ? (
        <div className="activeButtonPostions absolute bottom-0 right-0 z-10">
          <Active cardType={iframe} pageIsFetching={pageIsFetching} />
        </div>
      ) : null}
    </div>
  );
};

export {
  Website,
  ImageCard,
  BookCard,
  BioCard,
  Menus,
  Profile,
  Video,
  LinkPreviewCard,
  Iframe,
};

export default LinkCard;
