<template>
    <perfect-scrollbar>
        <div class="wrapper">
            <h2>
                Network Entity Reputation Database (NERD)
            </h2>

            <span>
                Database of malicious entities on the Internet and everything we know about them.
            </span>

            <p>
                The NERD system gathers data about sources of cyber threats from a number of sources and builds a constantly-updated database of the known malicious network entities (currently only IP addresses). It provides detailed information about each of them, including when and where it was reported as malicious, auxiliary data such as hostname or geolocation, and a numeric summarization of the IP's reputation. Most of the data are publicly accessible via this web interface.
            </p>

            <h3>
                Network entity profiles
            </h3>

            <p>
                NERD keeps a record for each IP address reported as a source of some network attack or other malicious activity. Such a record contains meta-data about the reports and other relevant information fetched from other sources (see below for the list of all used data sources). Most of the data is periodically updated. The web interface allows to get a detail of each individual IP address as well as search for IPs matching given criteria.

                Basic information about related BGP prefixes, ASNs, registered IP blocks and organizations (from whois databases) is stored as well.

                Moreover, the information known about each IP is summarized into a reputation score -- a number expressing the level of threat the IP address poses. Currently, quite a simple static formula is used to compute the reputation score, but there is an ongoing research about how to better estimate it.

            </p>

            <h3>
                Data sources
            </h3>

            <p>Data about detected malicious activities which are used to create IP profiles (so called "primary data") are taken from the following sources:</p>

            <ul>
            <li><b><a href="https://warden.cesnet.cz/en/index"  target="_blank">Warden</a></b></li>
            <ul>
                <li>Warden is the alert sharing system operated by CESNET, which collects reports from a number of systems, such as
                honeypots, netflow analyzers and other detectors of malicious traffic, deployed mostly (but not only) in Czech
                academic networks. Around a million alerts from over a dozen detection systems are shared every day.</li>
                <li>Warden is a closed community, full alert data are not publicly available, but we provide basic meta-data,
                such as the number of alerts per category and IP, via NERD.</li>
                <li>Until recently, this was the only primary data source of NERD and some parts of it still doesn't take the others
                into account, e.g. the "reputation score" is only computed from Warden events, filtering by attack category uses
                a <a href="https://idea.cesnet.cz/en/classifications" target="_blank">taxonomy</a> from Warden, etc.
                We are currently working on making NERD more general, i.e. less focused on Warden.</li>
            </ul>
            <li><b>Blacklists</b></li>
            <ul>
                <li>NERD uses almost 50 public "blacklists" (i.e. plain text lists of malicious IP addresses) from around 20 providers.
                Each IP address appearing on any of these lists gets a record created in NERD.</li>
            </ul>
            <li><b><a href="https://www.dshield.org/" target="_blank">DShield</a></b></li>
            <ul>
                <li>DShield is a collaborative firewall log correlation system run by SANS Institute.
                A large community of contributors share information about unexpected/unsolicited incoming connections into it,
                statistics about individual ports and IPs are available to anyone.</li>
                <li>NERD uses a daily feed of all IPs reported to DShield and ingests into its database any IP address reported
                at least 10 times by at least 3 distinct targets.</li>
            </ul>
            <li><b><a href="https://otx.alienvault.com/" target="_blank">AlienVault Open Threat Exchange (OTX)</a></b></li>
            <ul>
                <li>OTX is an open community portal where security researchers and professionals share millions of threat indicators daily.</li>
                <li>NERD is subscribed to several users and pulses which we found reliable and useful (the AlienVault account and several honeypot feeds).
                It look for any IP addresses in these pulses and creates or updates corresponding IP profiles accordingly.</li>
            </ul>
            <li><b><a href="https://www.misp-project.org/" target="_blank">MISP</a></b></li>
            <ul>
                <li>NERD is connected to a large MISP instance operated by CIRCL (<span title="CIRCL Private Sector Information Sharing Community - aka MISPPRIV">this one</span>)
                and includes IP addresses from all events tagged with "tlp:white" (i.e. public information).</li>
            </ul>
            </ul>

            <p>Each IP record (created based on data from one of the primary sources above) is further enriched by data from the following "secondary" sources:</p>

            <ul>
            <li>Hostname (as resolved by a reverse DNS query)</li>
            <li>Autonomous system number (ASN)</li>
            <li><i>whois</i> information</li>
            <li>Geolocation (according to MaxMind's <a href="https://dev.maxmind.com/geoip/geolite2-free-geolocation-data" target="_blank">GeoLite2 database</a>)</li>
            <li>Presence on blacklists that are not used as primary sources (either lists accessible via DNSBL only, or those whose entries are not necessarily malicious IPs, such as the list of TOR exit nodes)</li>
            <li>CESNET's passive DNS system</li>
            <li>Various tags describing the address, derived from other information</li>
            </ul>

            <p>We are always looking for new data sources to include.
            If you have or know about some data that could be added, please <a href="#contact">contact us</a>.</p>

            <hr>
            <h2>Access</h2>
            <a name="access"></a>

            <p>The data are available via a simple <a href="/nerd/">web GUI</a> and <a href="https://github.com/CESNET/NERD/wiki/RESTful-API">API</a>.
            Both allow to show details about an entity (IP address, ASN, etc.) or search entities by various parameters.</p>

            <p>Basic access to most of the data is allowed to anyone.</p>

            <p>However, some of the information in the system may be sensitive and can not be accessible to public
            (e.g. raw alerts from Warden or data from MISP with TLP other than 'white').
            Full access to the NERD system is therefore restricted to trusted partners only.
            Generally, it is granted to members of trusted CSIRT teams and well-known security researchers.</p>

            <hr>
            <h2>Source codes & more information</h2>
            <a name="source-codes"></a>

            <p>Source codes of all components of the NERD project are <a href="https://github.com/CESNET/NERD/">available on github</a>.
            Documentation is available on project's <a href="https://github.com/CESNET/NERD/wiki/">wiki</a></p>

            <p class="small">Although we publish source codes, it's (currently) not expected that someone deploys his or her own instance
            (some parts would not work well without access to Warden data).
            Therefore, although there are some installation scripts that should make the installation easy,
            they are not well tested, documented and do not cover everything.
            If possible, we recommend to access the main instance operated by CESNET instead and share data or collaborate on development.
            Nevertheless, if you still need to deploy your own instance, do not hesitate to contact us for assistance.</p>

            <p>For more information about how does it work, see our <a href="cybertim19_nerd.pdf">paper</a> from CyberTIM workshop at ARES 2019.</p>

            <hr>

            <div class="contact">
            <h2>Contact</h2>
            <a name="contact"></a>

            <p>For more information, to request access or provide feedback, or if you have some data to share, please contact:</p>
            <p><b>Václav Bartoš</b> at <b><i>bartos@cesnet.cz</i></b>.
            </p>
            </div>

            <hr>

            <h2>Acknowledgments</h2>
            <a name="ack"></a>

            <div class="ack">
                <p>NERD is developed and operated by <b><a href="https://www.cesnet.cz/" target="_blank">CESNET</a></b> (operator of the Czech National Research and Education Network)
                and its <a href="https://www.liberouter.org/" target="_blank">Liberouter</a> team.</p>

                <p><a href="https://www.cesnet.cz/" target="_blank"><img class="logo" src="cesnet-logo.png" alt="CESNET logo" width="130px" height="60px"></a>
                <a href="https://www.liberouter.org/" target="_blank"><img class="logo" src="liberouter-logo.png" alt="Liberouter logo" width="143.2px" height="46.4px" style="vertical-align: center"></a>
                </p>

                <p>The software this service is based on was developed within the scope of the
                Security Research Programme of the Czech Republic 2015 - 2020 (BV III / 1 VS)
                granted by the Ministry of the Interior of the Czech Republic under the project
                No. VI20162019029 The Sharing and analysis of security events in the Czech
                Republic (<a href="https://sabu.cesnet.cz/en/" target="_blank">SABU</a>).</p>

                <p>Computation of the <a href="https://github.com/CESNET/NERD/wiki/FMP-score">FMP score</a>
                and the underlying research were supported by the EU project
                <a href="https://protective-h2020.eu/" target="_blank">PROTECTIVE</a>.</p>

                <p>Development of some parts of the web interface was partially supported by the EU project
                <a href="https://www.geant.org/Projects/GEANT_Project_GN4" target="_blank">GÉANT GN4-2</a>.</p>

                <p>
                <a href="https://www.mvcr.cz" target="_blank"><img class="logo" src="mvcr-logo.png" alt="MVČR logo" width="147.5px" height="45px"></a>
                <a href="https://protective-h2020.eu/" target="_blank"><img class="logo" src="protective-logo.png" alt="PROTECTIVE logo" width="100px" height="45px"></a>
                <a href="https://www.geant.net" target="_blank"><img class="logo" src="geant-logo.png" alt="GÉANT logo" width="90px" height="45px"></a>
                </p>

                <p>
                Geolocation is performed using GeoLite2 data created by MaxMind, available from <a href="http://www.maxmind.com" target="_blank">http://www.maxmind.com</a>.<br>
                Classification of ASNs is performed using the <a href="http://www.caida.org/data/as_classification.xml" target="_blank">CAIDA UCSD AS Classification Dataset</a>.<br>
                </p>
            </div>
        </div>
    </perfect-scrollbar>
</template>

<style scoped>

@media (max-width: 800px) {
    .wrapper { 
    width: 98% !important;
}
}
.wrapper { 
    color: white;
    padding: 40px;
    height: 80vh;
    width: 60%;
    margin: auto;
    background-color: transparent;
}

a {
    color: #42b983;
    text-decoration: none;
}

p {
    text-align: left;
}

ul {
    text-align: left;
}
</style>