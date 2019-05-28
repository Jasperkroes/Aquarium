package com.fishtank.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import com.fishtank.model.Fish;
import com.fishtank.services.FishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class FishController {

	@Autowired
	private FishService fishService;

	private Fish mockFish = new Fish("404: Fish not found",0
			,"https://wac.das.myatos.net/portal/pki.jsp?DXATargetMethod=GET&DXA-authn-method=Login+Selector&DXATargetUrl=http%3A%2F%2Fwac.das.myatos.net%2Fsso_bluekiwi%2FSingleSignOnService%3FSAMLRequest%3DfVJdb9swDPwrht79EceJEyEJkDUYFqBbgzrbQ18KxaYbYTLlidSy7tdXcTqsBYo8CSLvjscDF6Q608u15yPewy8PxNGfziDJobEU3qG0ijRJVB2Q5FpW66%252B3Mk8y2TvLtrZGvKFcZygicKwtimi7WYrHYjaez4pDUagyq6dZMcnLeTM6NKVqYD6dtZO2VKN8mtetiH6Ao8BciiAU6EQetkiskEMpG83jrIizyX5UyHEp8%252FGDiDZhG42KB9aRuSeZpidVJ42ipHtWbClB4JTIPh6Mh5%252F6pNNK45OBSj%252FhHVbgfusaRLT%252B5%252FvGIvkO3Gvn%252B%252F3tf%252BW%252FgO9UddcbOGeSdrbxBpL%252B2KfDny5vHquahmoDrfKGY%252BrjoCKi3WuynzQ2wc%252F1UA8XEMkv%252B%252F0u3t1Ve7FanPXlEJJbfWxwkb7FLC6H8C2obzc7a3T9HH22rlN8ffi5opu4HaCSnULSgBwiM8aebhwohqVg50Gkq8vI9%252Be2egE%253D%26RelayState%3Dhttps%253A%252F%252Fzen.myatos.net%252Fhome"
			,0,new Date(),"the fish with your requested id could not be found in the database"
	);

	@ResponseBody
	@RequestMapping(value = "/fish/{id}", method = RequestMethod.GET)
	public Fish rateById(@PathVariable int id) {
		Optional<Fish> optionalFish = fishService.findById(id);
		return optionalFish.orElseGet(() -> this.mockFish);
	}

	@ResponseBody
	@RequestMapping(value = "/increaseLikes/{id}", method = RequestMethod.GET)
	public Fish increseLikes(@PathVariable int id){
		Optional<Fish> optionalFish = fishService.findById(id);
		if (optionalFish.isPresent()) {
			Fish fish = optionalFish.get();
			fish.setLikes(fish.getLikes() + 1);
			return fishService.save(fish);
		} else {
			return this.mockFish;
		}
	}

	@ResponseBody
	@RequestMapping(value = "/newFish", method = RequestMethod.POST)
	public Fish postFish(@RequestBody Fish fish) {
		return fishService.save(fish);
	}

	@ResponseBody
	@RequestMapping(value = "/fish", method = RequestMethod.GET)
	public List<Fish> findAll() {
		return (List<Fish>)fishService.findAll();
	}
}
