using System;
using System.Linq;
using net.sf.mpxj;
using net.sf.mpxj.MpxjUtilities;
using net.sf.mpxj.primavera;
using net.sf.mpxj.reader;

namespace MPXJTest2
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            
            XerStuff();
            


           Console.WriteLine("Press key...");
           Console.ReadKey();
        }

        public static void XerStuff()
        {
            PrimaveraXERFileReader xerReader = new PrimaveraXERFileReader {Encoding = "GB2312"};


            ProjectFile project =
                xerReader.read(
                    @"C:\development\playground\MPXJTest2\MPXJTest2\Hour_by_Hour_Possession_Programme_09_(5paris-date-03).xer");

            var tasks = project.Tasks;
            
            foreach (var task  in tasks.ToIEnumerable().Cast<Task>())
            {
                Console.WriteLine(task.Name);
                Console.WriteLine(task.Project);
            }

        }

        public static void UniStuff()
        {
            var reader = new UniversalProjectReader();
            ProjectFile project = reader.read(@"C:\development\playground\MPXJTest2\MPXJTest2\Hour_by_Hour_Possession_Programme_09_(5paris-date-03).xer");
            // reader.Encoding = "GB2312";

            TaskContainer tasks = project.Tasks;

            foreach (var task  in tasks.ToIEnumerable().Cast<Task>())
            {
                Console.WriteLine(task.Name);
                Console.WriteLine(task.Project);
            }
        }
    }
}