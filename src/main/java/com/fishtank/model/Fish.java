package com.fishtank.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Fish {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String sound;
	private int likes;
	private String ideaLink;
	private int age;
	private Date date;
	private String summary;

	public Fish() {}

	public Fish(String sound, int likes, String ideaLink, int age, Date date, String summary) {
		this.sound = sound;
		this.likes = likes;
		this.ideaLink = ideaLink;
		this.age = age;
		this.date = date;
		this.summary = summary;
	}

	public int getId() {
		return id;
	}

	public String getSound() {
		return sound;
	}

	public void setSound(String sound) {
		this.sound = sound;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public String getIdeaLink() {
		return ideaLink;
	}

	public void setIdeaLink(String ideaLink) {
		this.ideaLink = ideaLink;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	@Override
	public String toString() {
		return "Fish{" +
				"id=" + id +
				", sound='" + sound + '\'' +
				", likes=" + likes +
				", ideaLink='" + ideaLink + '\'' +
				", age=" + age +
				", date=" + date +
				'}';
	}
}
