using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;

namespace AgileWorks.Logger
{
    public static class LogUtils
    {
        public static ILog SystemLogger
        {
            get
            {
                return LogManager.GetLogger("SystemLogger");
            }
        }

        public static void Initialize()
        {
            log4net.Config.XmlConfigurator.Configure();
        }
    }
}
