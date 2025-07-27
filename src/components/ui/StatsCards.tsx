"use client";
import React from "react";
import { Zap, Target, Dumbbell, Calendar } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

const StatCard = ({ icon, label, value, className = "" }: StatCardProps) => {
  return (
    <div className={`stats-card ${className}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <div className="stats-label">{label}</div>
        <div className="stats-value">{value}</div>
      </div>
    </div>
  );
};

const StatsCards = () => {
  return (
    <div className="stats-grid">
      <StatCard
        icon={<Zap size={24} />}
        label="This Week"
        value="0/7"
        className="week-stats"
      />
      <StatCard
        icon={<Target size={24} />}
        label="Streak"
        value="0 days"
        className="streak-stats"
      />
      <StatCard
        icon={<Dumbbell size={24} />}
        label="Total Workouts"
        value="6"
        className="total-stats"
      />
      <StatCard
        icon={<Calendar size={24} />}
        label="This Month"
        value="3"
        className="month-stats"
      />
    </div>
  );
};

export default StatsCards;
