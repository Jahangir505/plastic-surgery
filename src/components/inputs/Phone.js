import { country_list } from "@/assets/data/countries";
import CountryCodeDropdown from "../countryDropdown/CountryDropdown";
const Phone = ({user, setUser}) => {
  const countries = country_list;
  return (
    <div class="relative z-0 w-full mb-5 group">
      <div class="mb-4">
        {/* <label for="phone" class="block text-gray-600">Phone Number</label> */}
        <div class="flex items-center">
          {/* <!-- Country code dropdown (you can replace this with your preferred library) --> */}

          <div className="z-50 bg-gray-700">
            <CountryCodeDropdown countries={countries} />
          </div>

          {/* <!-- Phone number input --> */}
          <input
            onChange={(e) => setUser({
              ...user,
              phone: e.target.value
            })}
            type="text"
            value={user.phone}
            name="phone"
            id="phone"
            placeholder="Enter your phone number"
            class="flex-1 border-t border-b border-r rounded-r-md px-3 py-2 focus:outline-none bg-gray-700 focus:ring focus:border-blue-300 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Phone;
