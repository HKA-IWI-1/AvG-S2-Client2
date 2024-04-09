/*
 * Copyright (c) 2024 - present Florian Sauer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

package de.hka_iwi_1.avg_s2_client;

import org.springframework.boot.SpringBootVersion;
import org.springframework.core.SpringVersion;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Locale;
import java.util.Objects;

/**
 * Banner as String-constant for the server start.
 */
final class Banner {

    // https://www.asciiart.eu/text-to-ascii-art
    private static final String FIGLET = """
                _         ____   ____ ____     ____ _ _            _  \s
               / \\__   __/ ___| / ___|___ \\   / ___| (_) ___ _ __ | |_\s
              / _ \\ \\ / / |  _  \\___ \\ __) | | |   | | |/ _ \\ '_ \\| __|
             / ___ \\ V /| |_| |  ___) / __/  | |___| | |  __/ | | | |_\s
            /_/   \\_\\_/  \\____| |____/_____|  \\____|_|_|\\___|_| |_|\\__|
            """;
    private static final String JAVA = Runtime.version() + "-" + System.getProperty("java.vendor");
    private static final String OS_VERSION = System.getProperty("os.name");
    private static final InetAddress LOCALHOST = getLocalhost();
    private static final long MEGABYTE = 1024L * 1024L;
    private static final Runtime RUNTIME = Runtime.getRuntime();
    private static final String USERNAME = System.getProperty("user.name");

    static final String TEXT = """

            $figlet
            (C) Florian Sauer, Adrian Spindler, Luca Breisinger, Ronny Friedmann
            Version             1
            Spring Boot         $springBoot
            Spring Framework    $spring
            Java                $java
            Operating system    $os
            Computer name       $computerName
            IP-Address          $ip
            Heap: Size          $heapSize MiB
            Heap: Free          $heapFree MiB
            Username            $username
            JVM Locale          $locale
            """
            .replace("$figlet", FIGLET)
            .replace("$springBoot", SpringBootVersion.getVersion())
            .replace("$spring", Objects.requireNonNull(SpringVersion.getVersion()))
            .replace("$java", JAVA)
            .replace("$os", OS_VERSION)
            .replace("$computerName", LOCALHOST.getHostName())
            .replace("$ip", LOCALHOST.getHostAddress())
            .replace("$heapSize", String.valueOf(RUNTIME.totalMemory() / MEGABYTE))
            .replace("$heapFree", String.valueOf(RUNTIME.freeMemory() / MEGABYTE))
            .replace("$username", USERNAME)
            .replace("$locale", Locale.getDefault().toString());

    @SuppressWarnings("ImplicitCallToSuper")
    private Banner() {
    }

    private static InetAddress getLocalhost() {
        try {
            return InetAddress.getLocalHost();
        } catch (final UnknownHostException ex) {
            throw new IllegalStateException(ex);
        }
    }

}
