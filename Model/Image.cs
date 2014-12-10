using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SL.Web.Model
{
    public class Image
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Thumbnail { get; set; }
        public string Src { get; set; }
        public int Sort { get; set; }
    }
}