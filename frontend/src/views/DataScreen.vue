<template>
    <div>
        <h2>Downloadable data</h2>
        <p>List of all IPs in NERD database with their reputation scores:<br>
            <a href='/nerd/data/ip_rep.csv' class="download">
                <i class="fa fa-solid fa-download"></i>
                <span>ip_rep.csv</span>
            </a>
        </p>
        <small>Warning! Don't use this file as a blocklist as is! It contains every single IP reported as malicious by some of our data sources and it probably contains some false positives (FP). Look at the associated reputation score, which summarizes the number of alerts, their age, and number of different sources that reported the IP. Higher score means lower probability of FP. So, if this data is to be used as a blocklist, we recommend to select only the IPs with reputation score greater than some threshold. Or use one of the files below, instead.</small>
        <p>List of malicious IPs (high confidence): <br>
            <a href='/nerd/data/bad_ips.txt' class="download">
                <i class="fa fa-solid fa-download"></i>
                <span>bad_ips.txt</span>
            </a>
        </p>
        <small>IP addresses with reputation score greater than 0.5 (means many recent reports from multiple sources). Very low chance of false positives. IPs tagged as research scanners are not included.</small>
        <p>List of malicious IPs (medium confidence): <br>
            <a href='/nerd/data/bad_ips_med_conf.txt' class="download">
                <i class="fa fa-solid fa-download"></i>
                <span>bad_ips_med_conf.txt</span>
            </a>
        </p>
        <small>IP addresses with reputation score greater than 0.2. This also includes less active IPs or those reported by just one source (but still multiple recent alerts are needed). Mostly reliable, but may contain a few false positives. IPs tagged as research scanners are not included.</small>
        <p>All files are updated once per hour.</p>
    </div>
</template>


<style scoped>
div {
    text-align: left;
    color: rgba(255, 255, 255, 0.835);
    padding: 20px;
}

.download {
    padding: 5px 8px;
    background-color: transparent;
    color: #42b983;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #42b983;
    display: inline-block;
}

.download .fa-download {
    margin-right: 15px;
    margin-left: 5px;
}

a {
    text-decoration: none;
}
</style>