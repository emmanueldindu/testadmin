


import Upload from "../assets/upload.png";

import "font-awesome/css/font-awesome.min.css";
import FileUploader from "../components/File";

// linense key = ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5bdURjXn9WcXFUQ2Bf

// charts
// color combination
// pie chart too plain

const Ecommerce = () => {
  return (
    <div className="mt-12">
      <div className="w-[85%]  dark:text-gray-200 dark:bg-secondary-dark-bg grid mx-auto h-[500px]  md:justify-center  bg-white rounded-md">
        <div className="w-[100%] p-6  ">
          <form action="">
            <input className="" type="file" name="file" id="" hidden />
            <div className="justify-center mx-auto  w-8 h-8 ">
              <div className="w-full justify-center mx-auto">
                <img src={Upload} alt="" />
              </div>
            </div>
            <FileUploader />

            <div className="mt-[70px] justify-center">
            <p className="text-lg font-semibold ">Browse an excel file to upload, should not be more than 15kb </p>

            </div>
            
            

          </form>
        
        
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Ecommerce;
