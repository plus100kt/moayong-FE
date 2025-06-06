const IconCamera = ({ width = 32, height = 32 }: { currentColor?: string, width?: number | string, height?: number | string }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21C17.6569 21 19 19.6569 19 18C19 16.3431 17.6569 15 16 15C14.3431 15 13 16.3431 13 18C13 19.6569 14.3431 21 16 21Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.0541 8C13.6237 8 13.2415 8.27543 13.1054 8.68377L12.4387 10.6838C12.2229 11.3313 12.7049 12 13.3874 12H9C7.89543 12 7 12.8954 7 14V22C7 23.1046 7.89543 24 9 24H23C24.1046 24 25 23.1046 25 22V14C25 12.8954 24.1046 12 23 12H18.6126C19.2951 12 19.7771 11.3313 19.5613 10.6838L18.8946 8.68377C18.7585 8.27543 18.3763 8 17.9459 8H14.0541ZM12.3 18C12.3 15.9565 13.9565 14.3 16 14.3C18.0435 14.3 19.7 15.9565 19.7 18C19.7 20.0435 18.0435 21.7 16 21.7C13.9565 21.7 12.3 20.0435 12.3 18Z" fill="currentColor" />
    </svg>

  );
}

export default IconCamera;