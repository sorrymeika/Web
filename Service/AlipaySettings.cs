using System;
using System.Collections.Generic;
using System.Linq;
using SL.Util;

namespace SL.Web.Service
{
    public class AlipaySetting
    {
        private static AlipaySetting alipaySetting;

        public static AlipaySetting getInstance()
        {
            if (null == alipaySetting)
            {
                alipaySetting = new AlipaySetting();
                return alipaySetting;
            }
            return alipaySetting;
        }

        private SettingUtil<dynamic> _settings;
        private dynamic _setting;

        private AlipaySetting()
        {
            _settings = new SettingUtil<dynamic>("Alipay");
            _setting = _settings.FirstOrDefault();
            if (_setting == null)
            {
                _setting = new SL.Data.DynamicRecord(new Dictionary<string, object>());
                _settings.Add(_setting);
            }
        }

        public void Set(Dictionary<string, string> settings)
        {
            foreach (var setting in settings)
            {
                _setting[setting.Key] = setting.Value;
            }
            _settings.Save();
        }

        public string WAP_Partner
        {
            get
            {
                return _setting.WAP_Partner;
            }
            set
            {
                _setting.WAP_Partner = value;
                _settings.Save();
            }
        }

        public string WAP_Private_key
        {
            get
            {
                return _setting.WAP_Private_key;
            }
            set
            {
                _setting.WAP_Private_key = value;
                _settings.Save();
            }
        }

        public string WAP_Public_key
        {
            get
            {
                return _setting.WAP_Public_key;
            }
            set
            {
                _setting.WAP_Public_key = value;
                _settings.Save();
            }
        }

        public string Direct_Partner
        {
            get
            {
                return _setting.Direct_Partner;
            }
            set
            {
                _setting.Direct_Partner = value;
                _settings.Save();
            }
        }

        public string Direct_Key
        {
            get
            {
                return _setting.Direct_Key;
            }
            set
            {
                _setting.Direct_Key = value;
                _settings.Save();
            }
        }

    }
}