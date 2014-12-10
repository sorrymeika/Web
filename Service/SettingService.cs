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
                return data.Select(a => new SL.Web.Model.Image
                {
                    ID = a.ID,
                    Title = a.Title,
                    Description = a.Description,
                    Url = a.Url,
                    Src = SL.Util.RequestFile.FullUrl(a.Src),
                    Thumbnail = SL.Util.RequestFile.GetCompressedImageSrc(a.Src),
                    Sort = a.Sort

                }).OrderByDescending(a => a.Sort).ToList();
            }
            return data;
        }

        public static IList<SL.Web.Model.Link> GetLinks(string name)
        {
            var settingUtil = new SL.Util.SettingUtil<SL.Web.Model.Link>(name + "Link");

            var data = settingUtil.Get();

            return data;
        }

        public static IList<SL.Web.Model.HtmlBlock> GetHtmlBlocks(string name)
        {
            var settingUtil = new SL.Util.SettingUtil<SL.Web.Model.HtmlBlock>(name + "HtmlBlock");

            var data = settingUtil.Get();

            return data;
        }
    }
}