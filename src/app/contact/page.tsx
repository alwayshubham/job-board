export default function ContactPage() {
  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">For others</h2>

          <div className="mb-4">
            <h3 className="font-semibold">University/college associations</h3>
            <p>Email us: <a href="mailto:university.relations@internshala.com" className="text-blue-500">university.relations@internshala.com</a></p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Media queries</h3>
            <p>Email us: <a href="mailto:pr@internshala.com" className="text-blue-500">pr@internshala.com</a></p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Fest sponsorships</h3>
            <p>Email us: <a href="mailto:pr@internshala.com" className="text-blue-500">pr@internshala.com</a></p>
          </div>

          <div>
            <h3 className="font-semibold">For everything else</h3>
            <p>Email us: <a href="mailto:sarvesh@internshala.com" className="text-blue-500">sarvesh@internshala.com</a></p>
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Address</h2>
          <p>Scholiverse Educare Pvt. Ltd. 901A/B, Iris Tech Park, Sector 48, Gurugram, Haryana, India - 122018</p>
          <div className="my-4">
            <img src="/google-map.png" alt="Google Maps" className="w-12 h-12" />
          </div>
          <p className="text-gray-700">Working Hours: Monday to Friday, 10:00 AM – 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}
