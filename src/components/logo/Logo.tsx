import { FC, ReactNode } from "react";

interface LogoProps {
   theme?: string;
}
type HEX = `#${string}`;
const Logo: FC<LogoProps> = ({ theme = "primary" }) => {
   const color: HEX = (() => {
      return theme === "primary" ? "#19376D" : "#fff";
   })();
   const color_second: HEX = (() => {
      return theme === "primary" ? "#fff" : "#19376D";
   })();
   return (
      <span className="logo">
         <svg
            width="193"
            height="57"
            viewBox="0 0 193 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
               d="M22.7452 0C10.1834 0 0 8.94196 0 19.1484V53.0692C-9.69991e-06 57.8652 6.74816 58.7372 6.74816 53.0692C6.74816 47.4012 5.50163 39.5986 7.26202 38.6394C7.26202 38.6394 9.25873 37.5306 9.45433 41.1058C9.64993 44.681 14.8655 45.8316 14.8655 41.7332C14.8655 37.6348 14.2478 36.5841 14.8655 33.5697C15.4832 30.5553 17.9495 32.7476 18.1907 33.8438C18.4319 34.9399 17.4083 44.7852 18.1907 48.2732C18.9731 51.7612 23.9593 51.4124 24.6635 48.2732C25.3676 45.134 21.5542 36.3268 25.7596 36.3268C29.965 36.3268 26.8169 41.1739 28.637 42.476C30.4572 43.778 32.592 42.8804 33.7408 41.7332C34.8895 40.5861 31.7499 33.7726 33.7408 32.0625C35.7317 30.3524 36.8382 32.214 37.9543 33.8438C39.0705 35.4735 36.6942 48.2732 38.8264 53.0692C40.9585 57.8652 44.8294 57.2227 45.4767 53.0692C46.1241 48.9158 45.4843 19.5065 45.4843 19.5065C45.4843 9.30005 35.307 0 22.7452 0Z"
               fill={color}
            />
            <path
               d="M18.0866 23.1825V11.1767C18.0866 7.61062 31.3763 14.1484 31.2393 17.1202C31.1023 20.0919 18.0866 26.5109 18.0866 23.1825Z"
               fill={color_second}
            />
            <path
               d="M67.6627 17.6818H73.3516L79.3601 32.3409H79.6158L85.6243 17.6818H91.3132V39.5H86.8388V25.299H86.6577L81.0114 39.3935H77.9645L72.3182 25.2457H72.1371V39.5H67.6627V17.6818ZM102.422 39.8196C100.767 39.8196 99.3361 39.468 98.1288 38.7649C96.9285 38.0547 96.0016 37.0675 95.3482 35.8033C94.6948 34.532 94.3681 33.0582 94.3681 31.3821C94.3681 29.6918 94.6948 28.2145 95.3482 26.9503C96.0016 25.679 96.9285 24.6918 98.1288 23.9886C99.3361 23.2784 100.767 22.9233 102.422 22.9233C104.077 22.9233 105.504 23.2784 106.705 23.9886C107.912 24.6918 108.843 25.679 109.496 26.9503C110.149 28.2145 110.476 29.6918 110.476 31.3821C110.476 33.0582 110.149 34.532 109.496 35.8033C108.843 37.0675 107.912 38.0547 106.705 38.7649C105.504 39.468 104.077 39.8196 102.422 39.8196ZM102.443 36.304C103.196 36.304 103.825 36.0909 104.329 35.6648C104.833 35.2315 105.213 34.642 105.469 33.8963C105.732 33.1506 105.863 32.3018 105.863 31.3501C105.863 30.3984 105.732 29.5497 105.469 28.804C105.213 28.0582 104.833 27.4687 104.329 27.0355C103.825 26.6023 103.196 26.3857 102.443 26.3857C101.683 26.3857 101.044 26.6023 100.526 27.0355C100.014 27.4687 99.6273 28.0582 99.3645 28.804C99.1089 29.5497 98.981 30.3984 98.981 31.3501C98.981 32.3018 99.1089 33.1506 99.3645 33.8963C99.6273 34.642 100.014 35.2315 100.526 35.6648C101.044 36.0909 101.683 36.304 102.443 36.304ZM128.155 23.1364L122.435 39.5H117.321L111.6 23.1364H116.394L119.792 34.8445H119.963L123.351 23.1364H128.155ZM130.478 39.5V23.1364H135.016V39.5H130.478ZM132.758 21.027C132.083 21.027 131.504 20.8033 131.021 20.3558C130.545 19.9013 130.307 19.358 130.307 18.7259C130.307 18.1009 130.545 17.5646 131.021 17.1172C131.504 16.6626 132.083 16.4354 132.758 16.4354C133.432 16.4354 134.008 16.6626 134.484 17.1172C134.966 17.5646 135.208 18.1009 135.208 18.7259C135.208 19.358 134.966 19.9013 134.484 20.3558C134.008 20.8033 133.432 21.027 132.758 21.027ZM146.109 39.8196C144.426 39.8196 142.977 39.4787 141.762 38.7969C140.555 38.108 139.625 37.1349 138.971 35.8778C138.318 34.6136 137.991 33.1186 137.991 31.3928C137.991 29.7095 138.318 28.2322 138.971 26.9609C139.625 25.6896 140.544 24.6989 141.73 23.9886C142.924 23.2784 144.323 22.9233 145.928 22.9233C147.007 22.9233 148.012 23.0973 148.943 23.4453C149.88 23.7862 150.697 24.3011 151.393 24.9901C152.096 25.679 152.643 26.5455 153.034 27.5895C153.424 28.6264 153.62 29.8409 153.62 31.233V32.4794H139.802V29.6669H149.348C149.348 29.0135 149.206 28.4347 148.922 27.9304C148.637 27.4261 148.243 27.032 147.739 26.7479C147.242 26.4567 146.663 26.3111 146.003 26.3111C145.314 26.3111 144.703 26.4709 144.17 26.7905C143.645 27.103 143.233 27.5256 142.934 28.0582C142.636 28.5838 142.483 29.1697 142.476 29.8161V32.4901C142.476 33.2997 142.625 33.9993 142.924 34.5888C143.229 35.1783 143.659 35.6328 144.213 35.9524C144.767 36.272 145.424 36.4318 146.184 36.4318C146.688 36.4318 147.15 36.3608 147.569 36.2188C147.988 36.0767 148.346 35.8636 148.645 35.5795C148.943 35.2955 149.17 34.9474 149.326 34.5355L153.524 34.8125C153.311 35.821 152.874 36.7017 152.213 37.4545C151.56 38.2003 150.715 38.7827 149.678 39.2017C148.648 39.6136 147.458 39.8196 146.109 39.8196ZM163.975 39.8196C162.32 39.8196 160.889 39.468 159.681 38.7649C158.481 38.0547 157.554 37.0675 156.901 35.8033C156.248 34.532 155.921 33.0582 155.921 31.3821C155.921 29.6918 156.248 28.2145 156.901 26.9503C157.554 25.679 158.481 24.6918 159.681 23.9886C160.889 23.2784 162.32 22.9233 163.975 22.9233C165.63 22.9233 167.057 23.2784 168.257 23.9886C169.465 24.6918 170.395 25.679 171.049 26.9503C171.702 28.2145 172.029 29.6918 172.029 31.3821C172.029 33.0582 171.702 34.532 171.049 35.8033C170.395 37.0675 169.465 38.0547 168.257 38.7649C167.057 39.468 165.63 39.8196 163.975 39.8196ZM163.996 36.304C164.749 36.304 165.378 36.0909 165.882 35.6648C166.386 35.2315 166.766 34.642 167.022 33.8963C167.284 33.1506 167.416 32.3018 167.416 31.3501C167.416 30.3984 167.284 29.5497 167.022 28.804C166.766 28.0582 166.386 27.4687 165.882 27.0355C165.378 26.6023 164.749 26.3857 163.996 26.3857C163.236 26.3857 162.597 26.6023 162.079 27.0355C161.567 27.4687 161.18 28.0582 160.917 28.804C160.662 29.5497 160.534 30.3984 160.534 31.3501C160.534 32.3018 160.662 33.1506 160.917 33.8963C161.18 34.642 161.567 35.2315 162.079 35.6648C162.597 36.0909 163.236 36.304 163.996 36.304ZM179.518 30.0398V39.5H174.98V23.1364H179.305V26.0234H179.497C179.859 25.0717 180.466 24.3189 181.319 23.7649C182.171 23.2038 183.204 22.9233 184.419 22.9233C185.555 22.9233 186.546 23.1719 187.391 23.669C188.236 24.1662 188.893 24.8764 189.362 25.7997C189.831 26.7159 190.065 27.8097 190.065 29.081V39.5H185.527V29.8906C185.534 28.8892 185.278 28.108 184.76 27.5469C184.241 26.9787 183.527 26.6946 182.618 26.6946C182.007 26.6946 181.468 26.826 180.999 27.0888C180.537 27.3516 180.175 27.7351 179.912 28.2393C179.657 28.7365 179.525 29.3366 179.518 30.0398Z"
               fill={color}
            />
         </svg>
      </span>
   );
};

export default Logo;
