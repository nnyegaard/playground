using System;
using System.Collections;
using System.Collections.ObjectModel;
using net.sf.mpxj;
using net.sf.mpxj.primavera;
using net.sf.mpxj.reader;

namespace MPXJTest1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            //ProjectReader reader = new UniversalProjectReader();
            PrimaveraXERFileReader reader = new PrimaveraXERFileReader();

            ProjectFile project = reader.read("C:\\development\\playground\\MPXJTest1\\test.xer");



           

        }
    }
    
}