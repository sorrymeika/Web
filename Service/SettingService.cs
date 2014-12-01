using System;
using System.Collections.Generic;
using System.Linq;

namespace SL.Web.Service
{
    public class SettingService
    {
        public static IList<SL.Web.Model.Image> GetImages(string name)
        {
            var settingUtil = new SL.Util.SettingUtil<SL.Web.Model.Image>(name + "Image");

            var data = settingUtil.Get();

            if (null != data)
            {
                data.All(a =>
                {
                    a.Src = SL.Util.RequestFile.GetCompressedImageSrc(a.Src);
                    return true;
                });
            }

            return data;
        }

        public static IList<SL.Web.Model.Link> GetLinks(string name)
        {
            var settingUtil = new SL.Util.SettingUtil<SL.Web.Model.Link>(name + "Link");

            var data = settingUtil.Get();

            return data;
        }
    }
}