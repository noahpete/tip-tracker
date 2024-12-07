package com.tipper.backend;

import com.tipper.backend.shift.Shift;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@RestController
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping("/")
	public List<Shift> hello() {
		return List.of(
				new Shift(1L, 20.00F, LocalDate.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now()),
				new Shift(2L, 70.00F, LocalDate.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now()),
				new Shift(3L, 120.00F, LocalDate.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now()),
				new Shift(4L, 75.00F, LocalDate.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now(), LocalDateTime.now())
		);
	}
}
